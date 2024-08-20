/* eslint-disable react-refresh/only-export-components */
import TradingPanel from 'pages/TradingPanel';
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
const Verified = lazy(() => import('pages/Verified'));
const Leaderboard = lazy(() => import('pages/Leaderboard'));

export const basic: routerType[] = [
  {
    title: 'Home',
    path: '',
    element: <Home />,
  },
  { title: 'Login', path: 'login', element: <Login /> },
  { title: 'Signup', path: 'signup', element: <Signup /> },
  { title: 'Verification', path: 'activate/:hash/:token/', element: <Verified /> },
];

export const dashboard: routerType[] = [
  { title: 'Dashboard', path: '', element: <Dashboard /> },
  { title: 'Profile', path: 'profile/:username', element: <Profile /> },
  { title: 'Live Market', path: 'live-market', element: <LiveMarket /> },
  { title: 'Settings', path: 'settings', element: <Settings /> },
  { title: 'Trade', path: 'trade', element: <Trade /> },
  { title: 'Portfolio', path: 'portfolio', element: <Portfolio /> },
  { title: 'Leaderboard', path: 'leaderboard', element: <Leaderboard /> },
  { title: 'Trading Panel', path: 'trading-panel', element: <TradingPanel /> },
];
