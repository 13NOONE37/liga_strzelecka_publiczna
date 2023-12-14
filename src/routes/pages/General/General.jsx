import React, { useContext, useEffect, useReducer } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import cx from 'classnames';
import styles from './General.module.css';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Select from '../../../components/select/Select';
import DefaultButton from '../../../components/button/Button';
import AppContext from '../../../store/AppContext';
import {
  MEN_CLASSIFY,
  WOMEN_CLASSIFY,
  TEAM_CLASSIFY,
} from '../../../enums/ClassEnum';
import getDateFromTimestamp from '../../../utils/getDateFromTimestamp';
import fetchData from '../../../utils/fetchData';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

export default function General() {
  const { seasons } = useContext(AppContext);
  const [generalState, setGeneralState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: false,
      canBeRefetched: false,
      currentClass: null,
      prevCurrentClass: null,

      currentSeason: null,
      data: null,
      searchPhrase: '',
    },
  );

  const sortResult = (data) => {
    data.sort((a, b) => {
      if (b.result !== a.result) {
        //If result isn't same we sort by result
        return b.result - a.result;
      } else {
        //If result is same we sort by ammount of tens
        return b.tens - a.tens;
      }
    });
  };

  const calcLossAndPlace = (data) => {
    const losses = data.map((element, index) => {
      if (index === 0) {
        return 0;
      } else {
        const prevResult = parseInt(data[index - 1].result);
        const currentResult = parseInt(element.result, 10);
        if (isNaN(prevResult) || isNaN(currentResult)) return 0;
        return prevResult - currentResult;
      }
    });

    return data.map((element, index) => ({
      ...element,
      result: element.result ?? 0,
      place: index + 1,
      loss: losses[index],
    }));
  };

  const handleFetchData = async () => {
    setGeneralState({ isLoading: true, searchPhrase: '' });

    try {
      const startDate = getDateFromTimestamp(
        generalState.currentSeason.value[0],
      );
      const endDate = getDateFromTimestamp(generalState.currentSeason.value[1]);

      if (generalState.prevCurrentClass.value === TEAM_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralTeams',
          start_date: startDate,
          end_date: endDate,
        });

        sortResult(data.data);
        setGeneralState({
          data: calcLossAndPlace(data.data),
        });
      } else if (generalState.prevCurrentClass.value === WOMEN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralWomen',
          start_date: startDate,
          end_date: endDate,
        });

        sortResult(data.data);
        setGeneralState({
          data: calcLossAndPlace(data.data),
        });
      } else if (generalState.prevCurrentClass.value === MEN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralMen',
          start_date: startDate,
          end_date: endDate,
        });
        sortResult(data.data);
        setGeneralState({
          data: calcLossAndPlace(data.data),
        });
      }
      setGeneralState({ canBeRefetched: true });
    } catch (error) {
      console.log(error);
    }
    setGeneralState({
      isLoading: false,
      currentClass: generalState.prevCurrentClass,
    });
  };

  return (
    <div className={styles.container}>
      <SearchBar
        seasons={seasons}
        generalState={generalState}
        setGeneralState={setGeneralState}
        handleFetchData={handleFetchData}
      />
      <div
        className={styles.searchBox}
        style={{
          opacity: !generalState.data?.length > 0 ? '0' : '1',
        }}
      >
        <Input
          type={'text'}
          value={generalState.searchPhrase}
          disabled={!generalState.data?.length > 0}
          placeholder={'Szukaj...'}
          onChange={(e) => {
            setGeneralState({ searchPhrase: e.target.value });
          }}
          additionalClasses={[styles.searchInput]}
          icon={
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <SearchIcon
                style={{ fill: '#fff', width: '25px', height: '25px' }}
              />
            </div>
          }
          iconPosition={'right'}
        />
      </div>

      <ScrollContainer
        hideScrollbars={false}
        nativeMobileScroll={true}
        className={cx(styles.resultContainer, {
          [styles['resultContainer__team']]:
            generalState.currentClass?.value === TEAM_CLASSIFY,
          [styles['resultContainer__individual']]:
            generalState.currentClass?.value === WOMEN_CLASSIFY ||
            generalState.currentClass?.value === MEN_CLASSIFY,
          [styles['resultContainer__disabled']]:
            generalState.data?.length === 0 || generalState.data === null,
        })}
      >
        {generalState.data?.length > 0 ? (
          <div className={styles['resultContainer--nav']}>
            {generalState.currentClass?.value === TEAM_CLASSIFY ? (
              <>
                <span className={styles.navPlace}>Miejsce</span>
                <span className={styles.navName}>Nazwa drużyny</span>
                <span className={styles.navResult}>Punkty</span>
                <span className={styles.navTens}>Dziesiątki</span>
                <span className={styles.navLoss}>Strata</span>
              </>
            ) : (
              <>
                <span className={styles.navPlace}>Miejsce</span>
                <span className={styles.navName}>Imię i nazwisko</span>
                <span className={styles.navName}>Drużyna</span>
                <span className={styles.navResult}>Punkty</span>
                <span className={styles.navTens}>Dziesiątki</span>
                <span className={styles.navLoss}>Strata</span>
              </>
            )}
          </div>
        ) : (
          <h2 className={styles.emptyState}>
            {generalState.data === null
              ? 'Wybierz informacje, aby pokazać wyniki.'
              : generalState.data?.length === 0 &&
                'Brak wyników dla tego sezonu.'}
          </h2>
        )}
        {generalState.currentClass?.value === TEAM_CLASSIFY && (
          <TeamResult generalState={generalState} />
        )}
        {(generalState.currentClass?.value === MEN_CLASSIFY ||
          generalState.currentClass?.value === WOMEN_CLASSIFY) && (
          <IndividualResult generalState={generalState} />
        )}
      </ScrollContainer>
    </div>
  );
}

function SearchBar({
  seasons,
  generalState,
  setGeneralState,
  handleFetchData,
}) {
  const classes = [
    {
      label: 'Drużyny',
      value: TEAM_CLASSIFY,
    },
    {
      label: 'Kobiety indywidualnie',
      value: WOMEN_CLASSIFY,
    },
    {
      label: 'Mężczyźni indywidualnie',
      value: MEN_CLASSIFY,
    },
  ];
  const { season, classify } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setGeneralState({
      currentSeason: seasons?.find(
        (item) => item.label === season?.replaceAll('-', '/'),
      ),
      prevCurrentClass: classes.find((item) => item.value == classify),
    });
  }, []);

  return (
    <div className={styles.searchBar}>
      <SelectWithHeading heading={'Wybierz sezon:'}>
        <Select
          isSearchable={false}
          placeholder={'Kliknij by wybrać'}
          options={seasons ?? undefined}
          value={generalState.currentSeason}
          onChange={(value) => {
            navigate(
              `/generalka/${value.label?.replaceAll('/', '-')}/${
                generalState.currentClass ? generalState.currentClass.value : ''
              }`,
            );
            setGeneralState({
              currentSeason: value,
              canBeRefetched: false,
            });
          }}
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
        />
      </SelectWithHeading>
      <SelectWithHeading heading={'Wybierz klasyfikacje:'}>
        <Select
          isSearchable={false}
          placeholder={'Kliknij by wybrać'}
          options={classes}
          value={generalState.prevCurrentClass}
          onChange={(value) => {
            navigate(
              `/generalka/${generalState.currentSeason?.label.replaceAll(
                '/',
                '-',
              )}/${value.value}`,
            );
            setGeneralState({
              prevCurrentClass: value,
              canBeRefetched: false,
            });
          }}
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
        />
      </SelectWithHeading>
      <DefaultButton
        text={generalState.canBeRefetched ? 'Odśwież' : 'Wyświetl'}
        customSize={{ width: '140px' }}
        additionalClasses={[styles.showButton]}
        disabled={!generalState.currentSeason || !generalState.prevCurrentClass}
        isLoading={generalState.isLoading}
        action={handleFetchData}
      />
    </div>
  );
}

function TeamResult({ generalState }) {
  return (
    <>
      {generalState.data &&
        generalState.data
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(generalState.searchPhrase.trim().toLowerCase()),
          )
          .map(({ school_id, place, name, result, tens, loss }) => (
            <div className={styles['resultContainer--row']} key={school_id}>
              <span className={styles.place}>{place}</span>
              <span className={styles.name}>{name}</span>
              <span className={styles.result}>{result}</span>
              <span className={styles.tens}>{tens}</span>
              <span className={styles.loss}>{-loss}</span>
            </div>
          ))}
    </>
  );
}
function IndividualResult({ generalState }) {
  return (
    <>
      {generalState.data &&
        generalState.data
          .filter((item) =>
            `${item.firstName} ${item.secondName} ${item.name}`
              .toLowerCase()
              .includes(generalState.searchPhrase.trim().toLowerCase()),
          )
          .map(
            ({
              shooter_id,
              place,
              name,
              firstName,
              secondName,
              result,
              tens,
              loss,
            }) => (
              <div className={styles['resultContainer--row']} key={shooter_id}>
                <span className={styles.place}>{place}</span>

                <NavLink
                  to={`/zawodnik/${shooter_id}`}
                  className={styles['shootersList--link']}
                >
                  {firstName} {secondName}
                </NavLink>
                <span className={styles.schoolName}>{name}</span>
                <span className={styles.result}>{result}</span>
                <span className={styles.tens}>{tens}</span>
                <span className={styles.loss}>{-loss}</span>
              </div>
            ),
          )}
    </>
  );
}
