import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'state/store';

import Header from 'components/Header';
import Footer from 'components/Footer';

const DashboardLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {!user?.is_verified && (
        <div className="absolute left-0 top-0 z-[100] flex w-full justify-between bg-red-500 p-5 text-center">
          <p>Please verify your email, an email has been sent to your email address</p>
          <div>x</div>
        </div>
      )}
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
    </>
  );
};

export default DashboardLayout;
