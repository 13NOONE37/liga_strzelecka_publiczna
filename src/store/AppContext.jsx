import React, { createContext } from 'react';

const AppContext = createContext({
  contests: null,
  setContests: () => {},
  seasons: null,
});
export default AppContext;
