import React, { useContext, useEffect, useReducer, useState } from 'react';
import cx from 'classnames';
import styles from './Rounds.module.css';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Select from '../../../components/select/Select';
import DefaultButton, { IconButton } from '../../../components/button/Button';
import AppContext from '../../../store/AppContext';
import fetchData from '../../../utils/fetchData';
import {
  MEN_CLASSIFY,
  WOMEN_CLASSIFY,
  TEAM_CLASSIFY,
} from '../../../enums/ClassEnum';
import ScrollContainer from 'react-indiana-drag-scroll';
import { ReactComponent as DropdownIcon } from '../../../assets/icons/arrow_drop_down.svg';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import calcResult from '../../../utils/calcResult';

export default function Rounds() {
  const { seasons, contests } = useContext(AppContext);
  const [roundsState, setRoundsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      localContests: null,
      currentContest: null,
      prevCurrentClass: null,
      currentClass: null,
      currentSeason: null,
      isLoading: false,
      canBeRefetched: false,
      data: null,
      searchPhrase: '',
    },
  );
  const sortTeam = (data) => {
    const { first_place_team_id, second_place_team_id, third_place_team_id } =
      contests.find((i) => i.contest_id === roundsState.currentContest?.value);

    data.sort((a, b) => {
      // Check if the current item is one of the specified IDs
      if (a.school_id === first_place_team_id) return -1; // a comes first
      if (b.school_id === first_place_team_id) return 1; // b comes first
      if (a.school_id === second_place_team_id) return -1;
      if (b.school_id === second_place_team_id) return 1;
      if (a.school_id === third_place_team_id) return -1;
      if (b.school_id === third_place_team_id) return 1;

      // If none of the special cases, sort by 'result' in descending order
      if (b.result !== a.result) {
        //If result isn't same we sort by result
        return b.result - a.result;
      } else {
        //If result is same we sort by ammount of tens
        return b.tens - a.tens;
      }
    });
  };
  const sortWomen = (data) => {
    const {
      woman_first_place_shooter_id,
      woman_second_place_shooter_id,
      woman_third_place_shooter_id,
    } = contests.find(
      (i) => i.contest_id === roundsState.currentContest?.value,
    );

    data.sort((a, b) => {
      // Check if the current item is one of the specified IDs
      if (a.shooter_id === woman_first_place_shooter_id) return -1; // a comes first
      if (b.shooter_id === woman_first_place_shooter_id) return 1; // b comes first
      if (a.shooter_id === woman_second_place_shooter_id) return -1;
      if (b.shooter_id === woman_second_place_shooter_id) return 1;
      if (a.shooter_id === woman_third_place_shooter_id) return -1;
      if (b.shooter_id === woman_third_place_shooter_id) return 1;

      // If none of the special cases, sort by 'result' in descending order
      if (b.result !== a.result) {
        //If result isn't same we sort by result
        return b.result - a.result;
      } else {
        //If result is same we sort by ammount of tens
        return b.tens - a.tens;
      }
    });
  };
  const sortMen = (data) => {
    const {
      man_first_place_shooter_id,
      man_second_place_shooter_id,
      man_third_place_shooter_id,
    } = contests.find(
      (i) => i.contest_id === roundsState.currentContest?.value,
    );

    data.sort((a, b) => {
      // Check if the current item is one of the specified IDs
      if (a.shooter_id === man_first_place_shooter_id) return -1; // a comes first
      if (b.shooter_id === man_first_place_shooter_id) return 1; // b comes first
      if (a.shooter_id === man_second_place_shooter_id) return -1;
      if (b.shooter_id === man_second_place_shooter_id) return 1;
      if (a.shooter_id === man_third_place_shooter_id) return -1;
      if (b.shooter_id === man_third_place_shooter_id) return 1;

      // If none of the special cases, sort by 'result' in descending order
      if (b.result !== a.result) {
        //If result isn't same we sort by result
        return b.result - a.result;
      } else {
        //If result is same we sort by ammount of tens
        return b.tens - a.tens;
      }
    });
  };

  const calcLosses = (data) => {
    return data.map((element, index) => {
      if (index === 0) {
        return 0;
      } else {
        const prevResult = parseInt(data[index - 1].result);
        const currentResult = parseInt(element.result, 10);
        if (isNaN(prevResult) || isNaN(currentResult)) return 0;

        return prevResult - currentResult;
      }
    });
  };

  const calcTeams = (data, contesters) => {
    sortTeam(data);
    const losses = calcLosses(data);

    return data.map((element, index) => ({
      ...element,
      members: contesters.filter((c) => c.team_id === element.team_id),
      result: element.result,
      place: index + 1,
      loss: losses[index],
    }));
  };
  const calcIndividual = (data, classify) => {
    data = data.map((element) => {
      const { result, tens } = calcResult(element);
      return {
        ...element,
        result: result ?? 0,
        tens: tens,
      };
    });

    if (classify === WOMEN_CLASSIFY) {
      sortWomen(data);
    } else if (classify === MEN_CLASSIFY) {
      sortMen(data);
    }

    const losses = calcLosses(data);

    return data.map((element, index) => ({
      ...element,
      place: index + 1,
      loss: losses[index],
    }));
  };

  const handleFetchData = async () => {
    //If we want places update on refresh button work we need to refetch contests

    setRoundsState({ isLoading: true, searchPhrase: '' });

    try {
      const contestId = roundsState.currentContest.value;
      if (roundsState.prevCurrentClass.value === TEAM_CLASSIFY) {
        const results = await fetchData({
          action: 'getRoundTeamsResult',
          contest_id: contestId,
        });
        const contesters = await fetchData({
          action: 'getRoundTeamsContesters',
          contest_id: contestId,
        });

        setRoundsState({
          data: calcTeams(results.data.data, contesters.data.data),
        });
      } else if (roundsState.prevCurrentClass.value === WOMEN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getRoundWomen',
          contest_id: contestId,
        });
        setRoundsState({
          data: calcIndividual(data.data, WOMEN_CLASSIFY),
        });
      } else if (roundsState.prevCurrentClass.value === MEN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getRoundMen',
          contest_id: contestId,
        });
        setRoundsState({
          data: calcIndividual(data.data, MEN_CLASSIFY),
        });
      }
      setRoundsState({ canBeRefetched: true });
    } catch (error) {
      console.log(error);
    }
    setRoundsState({
      isLoading: false,
      currentClass: roundsState.prevCurrentClass,
    });
  };

  useEffect(() => {
    if (!roundsState?.currentSeason) return;

    const newContests = contests
      .filter((item) => {
        const dateTimestamp = new Date(item.date).getTime();
        return roundsState.currentSeason.value === false
          ? true
          : dateTimestamp >= roundsState.currentSeason.value[0] &&
              dateTimestamp <= roundsState.currentSeason.value[1];
      })
      .sort((a, b) => {
        const dateA = new Date(b.date).getTime();
        const dateB = new Date(a.date).getTime();
        return dateA - dateB;
      })
      .map(({ name, contest_id }) => ({ label: name, value: contest_id }));

    setRoundsState({
      localContests: newContests,
    });
  }, [roundsState.currentSeason]);

  return (
    <div className={styles.container}>
      <SearchBar
        seasons={seasons}
        contests={roundsState.localContests}
        roundsState={roundsState}
        setRoundsState={setRoundsState}
        handleFetchData={handleFetchData}
      />

      <div
        className={styles.searchBox}
        style={{
          opacity: !roundsState.data?.length > 0 ? '0' : '1',
        }}
      >
        <Input
          type={'text'}
          value={roundsState.searchPhrase}
          disabled={!roundsState.data?.length > 0}
          placeholder={'Szukaj...'}
          onChange={(e) => {
            setRoundsState({ searchPhrase: e.target.value });
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
            roundsState.currentClass?.value === TEAM_CLASSIFY,
          [styles['resultContainer__individual']]:
            roundsState.currentClass?.value === WOMEN_CLASSIFY ||
            roundsState.currentClass?.value === MEN_CLASSIFY,
          [styles['resultContainer__disabled']]:
            roundsState.data?.length === 0 || roundsState.data === null,
        })}
      >
        {roundsState.data?.length > 0 ? (
          <div className={styles['resultContainer--nav']}>
            {roundsState.currentClass?.value === TEAM_CLASSIFY ? (
              <>
                <span className={styles.navPlace}>Miejsce</span>
                <span className={styles.navName}>Nazwa szkoły</span>
                <span className={styles.empty}></span>
                <span className={styles.navResult}>Punkty</span>
                <span className={styles.navTens}>Dziesiątki</span>
                <span className={styles.navLoss}>Strata</span>
              </>
            ) : (
              <>
                <span className={styles.navPlace}>Miejsce</span>
                <span className={styles.navName}>Imię i nazwisko</span>
                <span className={styles.navName}>Drużyna</span>
                <span className={styles.empty}></span>
                <span className={styles.navResult}>Punkty</span>
                <span className={styles.navTens}>Dziesiątki</span>
                <span className={styles.navLoss}>Strata</span>
              </>
            )}
          </div>
        ) : (
          <h2 className={styles.emptyState}>
            {roundsState.data === null
              ? 'Wybierz informacje, aby pokazać wyniki.'
              : roundsState.data?.length === 0 && 'Brak wyników dla tej rundy.'}
          </h2>
        )}
        {roundsState.currentClass?.value === TEAM_CLASSIFY && (
          <TeamResult roundsState={roundsState} />
        )}
        {(roundsState.currentClass?.value === MEN_CLASSIFY ||
          roundsState.currentClass?.value === WOMEN_CLASSIFY) && (
          <IndividualResult roundsState={roundsState} />
        )}
      </ScrollContainer>
    </div>
  );
}

function SearchBar({
  seasons,
  contests,
  roundsState,
  setRoundsState,
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
  const { season, classify, round } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const currentClass = classes.find((item) => item.value == classify);
    const currentSeason = seasons?.find(
      (item) => item.label === season?.replaceAll('-', '/'),
    );
    setRoundsState({
      currentSeason: currentSeason,
      currentClass: currentClass,
    });
  }, []);
  useEffect(() => {
    setRoundsState({
      currentContest: contests?.find((i) => i.value === round) ?? null,
    });
  }, [contests]);

  return (
    <div className={styles.searchBar}>
      <SelectWithHeading heading={'Wybierz sezon:'}>
        <Select
          isSearchable={false}
          placeholder={'Kliknij by wybrać'}
          options={seasons ?? undefined}
          value={roundsState.currentSeason}
          onChange={(value) => {
            navigate(
              `/rundy/${value.label?.replaceAll('/', '-')}/undefined/${
                roundsState.currentClass?.value
              }`,
            );
            setRoundsState({
              canBeRefetched: false,
              currentSeason: value,
              currentContest: null,
            });
          }}
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
        />
      </SelectWithHeading>

      <SelectWithHeading
        heading={'Wybierz rundę:'}
        additionalClasses={[styles.round]}
      >
        <Select
          isSearchable={false}
          placeholder={
            !roundsState.currentSeason
              ? 'Najpierw wybierz sezon'
              : 'Kliknij by wybrać'
          }
          options={contests}
          value={roundsState.currentContest}
          onChange={(value) => {
            navigate(
              `/rundy/${roundsState.currentSeason?.label.replaceAll(
                '/',
                '-',
              )}/${value.value}/${roundsState.currentClass?.value}`,
            );
            setRoundsState({
              canBeRefetched: false,
              currentContest: value,
            });
          }}
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
          isDisabled={!roundsState.currentSeason}
        />
      </SelectWithHeading>
      <SelectWithHeading
        heading={'Wybierz klasyfikacje:'}
        additionalClasses={[styles.classification]}
      >
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
          value={roundsState.prevCurrentClass}
          onChange={(value) => {
            navigate(
              `/rundy/${roundsState.currentSeason?.label.replaceAll(
                '/',
                '-',
              )}/${roundsState.currentContest?.value}/${value.value}`,
            );
            setRoundsState({
              canBeRefetched: false,
              prevCurrentClass: value,
            });
          }}
          width={'100%'}
          height={50}
          backgroundColor={'#222131'}
        />
      </SelectWithHeading>
      <DefaultButton
        text={roundsState.canBeRefetched ? 'Odśwież' : 'Wyświetl'}
        customSize={{ width: '140px' }}
        additionalClasses={[styles.showButton]}
        disabled={
          !roundsState.currentContest ||
          !roundsState.currentSeason ||
          !roundsState.prevCurrentClass
        }
        isLoading={roundsState.isLoading}
        action={handleFetchData}
      />
    </div>
  );
}

function TeamResult({ roundsState }) {
  return (
    <>
      {roundsState.data &&
        roundsState.data
          .filter((item) =>
            item.name
              .toLowerCase()
              .includes(roundsState.searchPhrase.trim().toLowerCase()),
          )
          .map((element) => (
            <TeamResultElement {...element} key={element.team_id} />
          ))}
    </>
  );
}

function TeamResultElement({
  school_id,
  place,
  name,
  result,
  tens,
  loss,
  members,
}) {
  const [showList, setShowList] = useState(false);
  return (
    <div className={styles['resultContainer--row']}>
      <span className={styles.place}>{place}</span>
      <span className={styles.name}>{name}</span>
      <span className={styles.dropdown}>
        <IconButton
          icon={<DropdownIcon />}
          additionalClasses={[
            cx(styles['dropdownButton'], {
              [styles['dropdownButton__active']]: showList,
            }),
          ]}
          action={() => setShowList((prev) => !prev)}
        />
      </span>
      <span className={styles.result}>{result || '0'}</span>
      <span className={styles.tens}>{tens}</span>
      <span className={styles.loss}>{-loss}</span>
      <div
        className={styles.shootersList}
        style={{
          display: showList ? 'grid' : 'none',
        }}
      >
        {members?.map((member) => (
          <NavLink
            to={`/zawodnik/${member.shooter_id}`}
            className={styles['shootersList--link']}
            key={member.shooter_id}
          >
            {member.firstName} {member.secondName}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
function IndividualResult({ roundsState }) {
  return (
    <>
      {roundsState.data &&
        roundsState.data
          .filter((item) =>
            `${item.firstName} ${item.secondName} ${item.name}`
              .toLowerCase()
              .includes(roundsState.searchPhrase.trim().toLowerCase()),
          )
          .map((element) => (
            <IndividualResultElement {...element} key={element.shooter_id} />
          ))}
    </>
  );

  function IndividualResultElement({
    shooter_id,
    shoot_1,
    shoot_2,
    shoot_3,
    shoot_4,
    shoot_5,
    shoot_6,
    shoot_7,
    shoot_8,
    shoot_9,
    shoot_10,
    place,
    name,
    firstName,
    secondName,
    result,
    tens,
    loss,
  }) {
    const [showList, setShowList] = useState(false);
    return (
      <div className={styles['resultContainer--row']}>
        <span className={styles.place}>{place}</span>
        <NavLink
          to={`/zawodnik/${shooter_id}`}
          className={styles['shootersList--link']}
        >
          {/* <span className={styles.name}> */}
          {firstName} {secondName}
          {/* </span> */}
        </NavLink>
        <span className={styles.schoolName}>{name}</span>
        <span className={styles.dropdown}>
          <IconButton
            icon={<DropdownIcon />}
            additionalClasses={[
              cx(styles['dropdownButton'], {
                [styles['dropdownButton__active']]: showList,
              }),
            ]}
            action={() => setShowList((prev) => !prev)}
          />
        </span>
        <span className={styles.result}>{result}</span>
        <span className={styles.tens}>{tens}</span>
        <span className={styles.loss}>{-loss}</span>
        <div
          className={styles.shootsList}
          style={{
            display: showList ? 'grid' : 'none',
          }}
        >
          <span>Strzały:</span>
          <span>{shoot_1}</span>
          <span>{shoot_2}</span>
          <span>{shoot_3}</span>
          <span>{shoot_4}</span>
          <span>{shoot_5}</span>
          <span>{shoot_6}</span>
          <span>{shoot_7}</span>
          <span>{shoot_8}</span>
          <span>{shoot_9}</span>
          <span>{shoot_10}</span>
        </div>
      </div>
    );
  }
}
