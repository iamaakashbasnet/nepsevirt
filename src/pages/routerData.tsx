/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import { routerType } from 'types/routerTypes';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const Dashboard = lazy(() => import('pages/Dashboard'));

export const basicRoutes: routerType[] = [
  {
    title: 'Home',
    path: '',
    element: <Home />,
  },
  { title: 'Login', path: 'login', element: <Login /> },
  { title: 'Signup', path: 'signup', element: <Signup /> },
];

export const dashboardRoutes: routerType[] = [{ title: 'Dashboard', path: '', element: <Dashboard /> }];
