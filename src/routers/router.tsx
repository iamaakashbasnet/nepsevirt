import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routerType } from 'types/routerTypes';
import { basic, dashboard } from './routerData';
import PrivateRoutes from 'utils/PrivateRoutes';
import DashboardLayout from 'components/DashboardLayout';

const Error404 = lazy(() => import('pages/Error404'));

const Router = () => {
  return (
    <Routes>
      {/* All basic pages routes */}
      {basic.map(({ path, title, element }: routerType) => (
        <Route key={title} path={`${path}`} element={element} />
      ))}

      {/* Dashboard pages routes */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route element={<PrivateRoutes />}>
          {dashboard.map(({ path, title, element }: routerType) => (
            <Route key={title} path={`${path}`} element={element} />
          ))}
        </Route>
      </Route>

      {/* Error 404 */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
