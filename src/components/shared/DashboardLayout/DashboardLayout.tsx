import { Outlet } from 'react-router-dom';

import { Header, Footer } from 'components';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="h-auto flex-grow p-4 pt-20 md:ml-64">
        <Outlet />
      </main>
      {/* Wrapping footer to shift to middle */}
      <div className="md:ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
