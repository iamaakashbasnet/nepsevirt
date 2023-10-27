import React from 'react';

import logo from 'assets/logo.png';

const Home: React.FC = () => {
  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <div>
        <h1>NEPSE Virt</h1>
        <p>Paper trading platform for NEPSE</p>
      </div>
    </div>
  );
};

export default Home;
