import Contester from './pages/Contester/Contester';
import General from './pages/General/General';
import Rounds from './pages/Rounds/Rounds';
import Start from './pages/Start/Start';

const pages = [
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/generalka',
    element: <General />,
  },
  {
    path: '/rundy',
    element: <Rounds />,
  },
  {
    path: '/profile',
    element: <Contester />,
  },
];
export default pages;
