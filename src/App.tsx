import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDispatch } from 'react-redux';
import Router from 'pages/router';
import { FallbackLoading } from 'components';
import { reAuthAsync } from 'state/user/authSlice';
import { AppDispatch } from 'state/store';

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(reAuthAsync());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.Suspense fallback={<FallbackLoading />}>
          <Router />
        </React.Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
