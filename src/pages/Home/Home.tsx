import React from 'react';

import Hero from './components/Hero/Hero';
import Intro from './components/Intro';
import { Footer } from 'components';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Footer />
    </>
  );
};

export default Home;
