import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'pages/router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
