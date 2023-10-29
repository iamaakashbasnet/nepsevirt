import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from 'pages/router';
import { FallbackLoading } from 'components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<FallbackLoading />}>
        <Router />
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
