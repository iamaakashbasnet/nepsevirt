import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from 'assets/logo.png';
import { AppDispatch, RootState } from 'state/store';
import { loginAsync } from 'state/user/authSlice';

type LoginData = {
  email: '';
  password: '';
};

type LocationState = {
  next: string;
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevLoginData) => ({ ...prevLoginData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await dispatch(loginAsync(loginData));
  };

  const state = location.state as LocationState;

  if (isAuthenticated) {
    if (location.state) {
      return <Navigate to={state.next} />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-5">
      <h1 className="mb-6 flex items-center font-heading text-3xl font-semibold">
        <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
        NEPSE Virt
      </h1>

      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="text-center text-xl font-bold leading-tight tracking-tight">Log in to your account</h2>

          <form action="#" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Your email
              </label>
              <input
                type="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="example@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block font-medium">
                Password
              </label>
              <input
                type="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button className="block w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Login
            </button>
          </form>
          <p className="my-3 text-sm">
            Don&apos;t have an account yet?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
