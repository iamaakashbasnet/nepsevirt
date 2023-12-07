/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import { routerType } from 'types/routerTypes';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const LiveMarket = lazy(() => import('pages/LiveMarket'));
const Profile = lazy(() => import('pages/Profile'));
const Settings = lazy(() => import('pages/Settings'));
const Trade = lazy(() => import('pages/Trade'));
const Portfolio = lazy(() => import('pages/Portfolio'));

export const basicRoutes: routerType[] = [
  {
    title: 'Home',
    path: '',
    element: <Home />,
  },
  { title: 'Login', path: 'login', element: <Login /> },
  { title: 'Signup', path: 'signup', element: <Signup /> },
];

export const dashboardRoutes: routerType[] = [
  { title: 'Dashboard', path: '', element: <Dashboard /> },
  { title: 'Profile', path: 'profile/:username', element: <Profile /> },
  { title: 'Live Market', path: 'live-market', element: <LiveMarket /> },
  { title: 'Settings', path: 'settings', element: <Settings /> },
  { title: 'Trade', path: 'trade', element: <Trade /> },
  { title: 'Portfolio', path: 'portfolio', element: <Portfolio /> },
];
