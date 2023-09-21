import React, { useEffect, useReducer, useState } from 'react';
import cx from 'classnames';
import styles from './Contester.module.css';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '../../../utils/fetchData';
import calcResult from '../../../utils/calcResult';
import { IconButton } from '../../../components/button/Button';
import { ReactComponent as DropdownIcon } from '../../../assets/icons/arrow_drop_down.svg';
import Loader from '../../../components/loader/Loader';

export default function Contester() {
  const navigate = useNavigate();

  const [contesterState, setContesterState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: false,
      canBeRefetched: false,
      data: null,
      username: '',
      error: false,
    },
  );
  const { id } = useParams();

  const calcPoints = (data) => {
    return data.map((element) => {
      const { result, tens } = calcResult(element);
      return {
        ...element,
        result,
        tens,
      };
    });
  };

  const handleFetchData = async () => {
    setContesterState({ isLoading: true });

    try {
      const nameData = await fetchData({
        action: 'getUserName',
        shooter_id: id,
      });
      console.log(nameData);

      const { status, data } = await fetchData({
        action: 'getProfileData',
        shooter_id: id,
      });
      setContesterState({
        data: calcPoints(data.data),
        username: `${nameData.data.data[0].firstName} ${nameData.data.data[0].secondName}`,
      });

      setContesterState({ canBeRefetched: true });
    } catch (error) {
      setContesterState({ error: true });
      console.log(error);
    }
    setContesterState({ isLoading: false });
  };

  useEffect(() => {
    if (id) {
      handleFetchData();
    }
  }, []);

  return contesterState.isLoading ? (
    <Loader />
  ) : contesterState.error ? (
    <h2 className={styles.error}>Coś poszło nie tak</h2>
  ) : (
    <div className={styles.container}>
      <div className={styles.nameContainer}>{contesterState.username}</div>
      <ScrollContainer
        hideScrollbars={false}
        nativeMobileScroll={true}
        className={cx(
          styles.resultContainer,
          styles['resultContainer__individual'],
        )}
      >
        {contesterState.data?.length > 0 ? (
          <div className={styles['resultContainer--nav']}>
            <span className={styles.navDate}>Data</span>
            <span className={styles.navResult}>Punkty</span>
            <span className={styles.navTens}>Dziesiątki</span>
            <span className={styles.dropdown}></span>
            <span className={styles.navPlace}>Runda</span>
          </div>
        ) : (
          <h2 className={styles.emptyState}>
            {contesterState.data?.length === 0 &&
              'Brak wyników dla tego zawodnika.'}
          </h2>
        )}
        <IndividualResult contesterState={contesterState} />
      </ScrollContainer>
    </div>
  );
}

function IndividualResult({ contesterState }) {
  return (
    <>
      {contesterState.data &&
        contesterState.data.map((element) => (
          <IndividualResultElement {...element} />
        ))}
    </>
  );
}

const MONTHS = [
  'styczeń',
  'luty',
  'marzec',
  'kwiecień',
  'maj',
  'czerwiec',
  'lipiec',
  'sierpień',
  'wrzesień',
  'październik',
  'listopad',
  'grudzień',
];
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
  team_id,
  schoolName,
  result,
  tens,
  date,
}) {
  const [showList, setShowList] = useState(false);
  const today = new Date(date);

  return (
    <div className={styles['resultContainer--row']} key={team_id}>
      <span className={styles.date}>
        {`${today.getDate()} ${
          MONTHS[today.getMonth()]
        } ${today.getFullYear()}`}
      </span>
      <span className={styles.result}>{result}</span>
      <span className={styles.tens}>{tens}</span>
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
      <span className={styles.schoolName}>{schoolName}</span>
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
