import React, { useContext, useEffect, useReducer } from 'react';
import styles from './Rounds.module.css';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Select from '../../../components/select/Select';
import DefaultButton from '../../../components/button/Button';
import AppContext from '../../../store/AppContext';
import fetchData from '../../../utils/fetchData';
import {
  MAN_CLASSIFY,
  WOMAN_CLASSIFY,
  TEAM_CLASSIFY,
} from '../../../enums/ClassEnum';

export default function Rounds() {
  const { seasons, contests } = useContext(AppContext);
  const [roundsState, setRoundsState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      localContests: null,
      currentContest: null,
      currentClass: null,
      currentSeason: null,
      isLoading: false,
      canBeRefetched: false,
    },
  );

  const handleFetchData = async () => {
    setRoundsState({ isLoading: true });

    try {
      const contestId = roundsState.currentContest.value;
      if (roundsState.currentClass.value === TEAM_CLASSIFY) {
        const results = await fetchData({
          action: 'getRoundTeamsResult',
          contest_id: contestId,
        });
        const contesters = await fetchData({
          action: 'getRoundTeamsContesters',
          contest_id: contestId,
        });
        console.log(results, contesters);
      } else if (roundsState.currentClass.value === WOMAN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getRoundWomen',
          contest_id: contestId,
        });
        console.log(status, data);
      } else if (roundsState.currentClass.value === MAN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getRoundMen',
          contest_id: contestId,
        });
        console.log(status, data);
      }
      setRoundsState({ canBeRefetched: true });
    } catch (error) {
      console.log(error);
    }
    setRoundsState({ isLoading: false });
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
      <div className={styles.resultContainer}>Rounds</div>
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
  return (
    <div className={styles.searchBar}>
      <SelectWithHeading heading={'Wybierz sezon:'}>
        <Select
          isSearchable={false}
          placeholder={'Kliknij by wybrać'}
          options={seasons}
          value={roundsState.currentSeason}
          onChange={(value) =>
            setRoundsState({
              canBeRefetched: false,
              currentSeason: value,
              currentContest: null,
            })
          }
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
          onChange={(value) =>
            setRoundsState({ canBeRefetched: false, currentContest: value })
          }
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
              value: WOMAN_CLASSIFY,
            },
            {
              label: 'Mężczyźni indywidualnie',
              value: MAN_CLASSIFY,
            },
          ]}
          value={roundsState.currentClass}
          onChange={(value) =>
            setRoundsState({ canBeRefetched: false, currentClass: value })
          }
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
          !roundsState.currentClass
        }
        isLoading={roundsState.isLoading}
        action={handleFetchData}
      />
    </div>
  );
}
