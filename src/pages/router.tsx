import { Route, Routes } from 'react-router-dom';

import { basicRoutes, dashboardRoutes } from './routerData';
import { routerType } from 'types/routerTypes';
import PrivateRoutes from 'utils/PrivateRoutes';
import { DashboardLayout } from 'components';

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
    </Routes>
  );
};

export default Router;
