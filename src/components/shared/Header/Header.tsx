import React from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

const Header: React.FC = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
    </>
  );
};

export default Header;
