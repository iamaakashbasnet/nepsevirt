import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { routerType } from 'types/routerTypes';
import { basic, dashboard } from './routerData';
import PrivateRoutes from 'utils/PrivateRoutes';
import DashboardLayout from 'components/DashboardLayout';
import Error404 from 'pages/Error404';

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {basic.map(({ path, title, element }: routerType) => (
        <Route key={title} path={`${path}`} element={element} />
      ))}

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route element={<PrivateRoutes />}>
          {dashboard.map(({ path, title, element }: routerType) => (
            <Route key={title} path={`${path}`} element={element} />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Error404 />} />
    </>,
  ),
);

export default mainRouter;
