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
    path: '/generalka/:season?/:classify?',
    element: <General />,
  },
  {
    path: '/rundy/:season?/:round?/:classify?',
    element: <Rounds />,
  },
  {
    path: '/zawodnik/:id',
    element: <Contester />,
  },
];
export default pages;
