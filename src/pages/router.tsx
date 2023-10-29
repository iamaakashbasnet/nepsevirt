import { Route, Routes } from 'react-router-dom';

import routerData from './routerData';
import { routerType } from 'types/routerTypes';

const Router = () => {
  const pageRoutes = routerData.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
