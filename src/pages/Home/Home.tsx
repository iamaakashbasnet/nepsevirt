import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'state/store';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Footer from 'components/Footer';

const Home = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Hero />
      <Intro />
      <Footer />
    </>
  );
};

export default Home;
