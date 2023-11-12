import { Link } from 'react-router-dom';

import logo from 'assets/logo.png';

const Signup = () => {
  return (
    <>
      <div className="mx-auto flex h-screen flex-col items-center justify-center">
        <h1 className="mb-6 flex items-center font-heading text-3xl font-semibold">
          <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
          NEPSE Virt
        </h1>

        <div className="card w-96 bg-slate-100 dark:bg-neutral dark:text-neutral-content">
          <div className="card-body">
            <h2 className="card-title m-auto">Create an account</h2>
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Your email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                id="email"
                name="email"
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
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="password2" className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                id="password2"
                name="password2"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="my-3 flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input id="terms" type="checkbox" />
                </div>
                <div className="ml-1 text-sm">
                  <label htmlFor="terms">
                    I accept the{' '}
                    <Link className="link font-medium" to="#">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            <Link to="#" className="btn btn-primary">
              Create
            </Link>
            <p className="my-3 text-sm">
              Already have an account yet?{' '}
              <Link to="/login" className="link-primary link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
