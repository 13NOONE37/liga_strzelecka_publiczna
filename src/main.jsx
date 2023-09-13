import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <HashRouter> */}
      <App />
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>,
);
