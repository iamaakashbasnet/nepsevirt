import { useState } from 'react';
import { useMutation } from 'react-query';

import { passwordChange, StateProps } from '../api';

const PasswordSecurity = () => {
  const [state, setState] = useState<StateProps>({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => passwordChange(state),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <>
      <form className="mb-2 space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            Old Password
          </label>
          <input
            type="password"
            name="old_password"
            id="old_password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={state.old_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={state.new_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={state.confirm_password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            disabled={isLoading && true}
            className={`${
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              isLoading && `animate-pulse`
            } block rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordSecurity;
