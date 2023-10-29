import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'pages/router';

const App: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
