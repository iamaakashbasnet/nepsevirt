import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App.tsx';
import './styles/index.css';
import { store } from 'state/store.ts';

axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
