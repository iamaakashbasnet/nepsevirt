import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages';

const App: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
