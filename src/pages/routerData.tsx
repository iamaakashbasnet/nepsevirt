import { Home, Login, Signup } from 'pages';
import { routerType } from 'types/routerTypes';

const routerData: routerType[] = [
  {
    title: 'Home',
    path: '',
    element: <Home />,
  },
  { title: 'Login', path: 'login', element: <Login /> },
  { title: 'Signup', path: 'signup', element: <Signup /> },
];

export default routerData;
