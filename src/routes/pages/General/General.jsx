import React, { useContext, useEffect, useReducer } from 'react';
import styles from './General.module.css';
import SelectWithHeading from '../../../components/select/SelectWithHeading';
import Select from '../../../components/select/Select';
import DefaultButton from '../../../components/button/Button';
import AppContext from '../../../store/AppContext';
import {
  MAN_CLASSIFY,
  WOMAN_CLASSIFY,
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
    },
  );

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
        console.log(status, data);
      } else if (generalState.currentClass.value === WOMAN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralWomen',
          start_date: startDate,
          end_date: endDate,
        });
        console.log(status, data);
      } else if (generalState.currentClass.value === MAN_CLASSIFY) {
        const { status, data } = await fetchData({
          action: 'getGeneralMen',
          start_date: startDate,
          end_date: endDate,
        });
        console.log(status, data);
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
      <div className={styles.resultContainer}>General</div>
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
            setGeneralState({ currentSeason: value, canBeRefetched: false })
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
              value: WOMAN_CLASSIFY,
            },
            {
              label: 'Mężczyźni indywidualnie',
              value: MAN_CLASSIFY,
            },
          ]}
          value={generalState.currentClass}
          onChange={(value) =>
            setGeneralState({ currentClass: value, canBeRefetched: false })
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
