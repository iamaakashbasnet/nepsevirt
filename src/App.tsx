import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'allotment/dist/style.css';

import mainRouter from 'routers/router';
import FallbackLoading from 'components/FallbackLoading';
import { reAuthAsync } from 'state/user/authSlice';
import { AppDispatch } from 'state/store';

const App = () => {
  const queryClient = new QueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = document.documentElement.classList.contains('dark');

  useEffect(() => {
    void dispatch(reAuthAsync());

    // Create a Blob object with the worker logic
    const workerBlob = new Blob([
      `
        setInterval(() => {
          self.postMessage('dispatch reAuthAsync');
        }, 4 * 60 * 1000); // 4 minutes in milliseconds
      `,
    ]);

    const worker = new Worker(URL.createObjectURL(workerBlob));

    // Listen for messages from the worker
    worker.onmessage = (event) => {
      if (event.data === 'dispatch reAuthAsync') {
        // Dispatch reAuthAsync when message received
        void dispatch(reAuthAsync());
      }
    };

    // Clean up on unmount
    return () => {
      worker.terminate(); // Terminate the worker when the component is unmounted
    };
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<FallbackLoading />}>
        <RouterProvider router={mainRouter} />
      </React.Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
