import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { basicRoutes, dashboardRoutes } from './routerData';
import { routerType } from 'types/routerTypes';
import PrivateRoutes from 'utils/PrivateRoutes';
import { DashboardLayout } from 'components';

const Error404 = lazy(() => import('pages/Error404'));

const Router = () => {
  const _basicRoutes = basicRoutes.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`${path}`} element={element} />;
  });

  const _dashboardRoutes = dashboardRoutes.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`${path}`} element={element} />;
  });

  return (
    <Routes>
      {_basicRoutes}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route element={<PrivateRoutes />}>{_dashboardRoutes}</Route>
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
