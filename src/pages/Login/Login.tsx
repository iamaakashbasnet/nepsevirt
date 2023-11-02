import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from 'assets/logo.png';
import { AppDispatch } from 'state/store';
import { loginAsync } from 'state/user/authSlice';

type LoginData = {
  email: '';
  password: '';
};

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevLoginData) => ({ ...prevLoginData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    await dispatch(loginAsync(loginData));
    e.preventDefault();
  };

  return (
    <>
      <div className="mx-auto flex h-screen flex-col items-center justify-center">
        <h1 className="mb-6 flex items-center font-heading text-3xl font-semibold">
          <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
          NEPSE Virt
        </h1>

        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title m-auto">Log in to your account</h2>

            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Your email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="example@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="my-3 flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="remember" type="checkbox" />
                </div>
                <div className="ml-1 text-sm">
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>

              <Link to="#" className="link text-sm">
                Forgot password?
              </Link>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
            <p className="my-3 text-sm">
              Don&apos;t have an account yet?{' '}
              <Link to="/signup" className="link-primary link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
