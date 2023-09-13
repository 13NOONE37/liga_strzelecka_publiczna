import React, { useEffect, useReducer, useState } from 'react';

import styles from './App.Module.css';
import AppContext from '../../store/AppContext';
import { Route, Routes } from 'react-router-dom';
import pages from '../../routes/Pages';
import NotFound from '../../routes/pages/NotFound/NotFound';
import fetchData from '../../utils/fetchData';
import Navbar from '../navbar/Navbar';
import calculateSeasons from '../../utils/calculateSeasons';
import Loader from '../loader/Loader';

function App() {
  const [appState, setAppState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      contests: null,
      seasons: null,

      isLoading: true,
      error: false,
    },
  );

  useEffect(() => {
    const fetchContests = async () => {
      try {
        //fetch contests
        let contests = await fetchData({
          action: 'getContests',
        });
        contests = contests.data.data;

        if (contests instanceof Array) {
          setAppState({
            contests: contests,
            seasons: calculateSeasons(contests),
          });
        } else {
          setAppState({ contests: [], seasons: null });
        }
      } catch (error) {
        setAppState({ error: true });
      }

      setAppState({ isLoading: false });
    };
    fetchContests();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      {appState.isLoading && <Loader />}
      {!appState.isLoading && appState.error && (
        <div className={styles.error}>
          <h2>Coś poszło nie tak. </h2>
        </div>
      )}
      {!appState.error && !appState.isLoading && (
        <AppContext.Provider
          value={{
            contests: appState.contests,
            setContests: (value) => setAppState({ contests: value }),
            seasons: appState.seasons,
          }}
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            {pages.map(({ path, element }) => (
              <Route path={path} element={element} key={path} />
            ))}
          </Routes>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
