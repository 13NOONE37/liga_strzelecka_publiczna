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
export default function General() {
  const { seasons } = useContext(AppContext);
  const [generalState, setGeneralState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: false,
      canBeRefetched: false,
      currentClass: null,
      currentSeason: null,
      data: null,
    },
  );

  const calcLossAndPlace = (data) => {
    const losses = data.map((element, index) => {
      if (index === 0) {
        return 0;
      } else {
        const prevResult = parseInt(data[index - 1].result);
        const currentResult = parseInt(element.result, 10);
        return prevResult - currentResult;
      }
    });

    return data.map((element, index) => ({
      ...element,
      place: index + 1,
      loss: losses[index],
    }));
  };
  const handleFetchData = async () => {
    setGeneralState({ isLoading: true });

    try {
      const startDate = getDateFromTimestamp(
        generalState.currentSeason.value[0],
      );
      const endDate = getDateFromTimestamp(generalState.currentSeason.value[1]);

      if (generalState.currentClass.value === TEAM_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralTeams',
          start_date: startDate,
          end_date: endDate,
        });
        setGeneralState({
          data: calcLossAndPlace(data.data),
        });
      } else if (generalState.currentClass.value === WOMEN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralWomen',
          start_date: startDate,
          end_date: endDate,
        });
        setGeneralState({
          data: calcLossAndPlace(data.data),
        });
      } else if (generalState.currentClass.value === MEN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralMen',
          start_date: startDate,
          end_date: endDate,
        });
        setGeneralState({
          data: calcLossAndPlace(data.data),
        });
      }
      setGeneralState({ canBeRefetched: true });
    } catch (error) {
      console.log(error);
    }
    setGeneralState({ isLoading: false });
  };

  return (
    <div className={styles.container}>
      <SearchBar
        seasons={seasons}
        generalState={generalState}
        setGeneralState={setGeneralState}
        handleFetchData={handleFetchData}
      />

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
                <span className={styles.navName}>Nazwa szkoły</span>
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
  return (
    <div className={styles.searchBar}>
      <SelectWithHeading heading={'Wybierz sezon:'}>
        <Select
          isSearchable={false}
          placeholder={'Kliknij by wybrać'}
          options={seasons}
          value={generalState.currentSeason}
          onChange={(value) =>
            setGeneralState({
              currentSeason: value,
              canBeRefetched: false,
              data: null,
            })
          }
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
        />
      </SelectWithHeading>
      <SelectWithHeading heading={'Wybierz klasyfikacje:'}>
        <Select
          isSearchable={false}
          placeholder={'Kliknij by wybrać'}
          options={[
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
          ]}
          value={generalState.currentClass}
          onChange={(value) =>
            setGeneralState({
              currentClass: value,
              canBeRefetched: false,
              data: null,
            })
          }
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
        />
      </SelectWithHeading>
      <DefaultButton
        text={generalState.canBeRefetched ? 'Odśwież' : 'Wyświetl'}
        customSize={{ width: '140px' }}
        additionalClasses={[styles.showButton]}
        disabled={!generalState.currentSeason || !generalState.currentClass}
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
        generalState.data.map(
          ({ school_id, place, name, result, tens, loss }) => (
            <div className={styles['resultContainer--row']} key={school_id}>
              <span className={styles.place}>{place}</span>
              <span className={styles.name}>{name}</span>
              <span className={styles.result}>{result}</span>
              <span className={styles.tens}>{tens}</span>
              <span className={styles.loss}>{-loss}</span>
            </div>
          ),
        )}
    </>
  );
}
function IndividualResult({ generalState }) {
  return (
    <>
      {generalState.data &&
        generalState.data.map(
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
              <span className={styles.name}>
                {firstName} {secondName}
              </span>
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
