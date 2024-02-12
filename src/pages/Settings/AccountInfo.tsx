import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import { RootState, AppDispatch } from 'state/store';
import { loadUserDataAsync } from 'state/user/authSlice';
import { updateUserData, UserProfileTypes } from './api';

const AccountInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [state, setState] = useState<UserProfileTypes>({
    firstname: user?.firstname,
    lastname: user?.lastname,
    username: user?.username,
    email: user?.email,
    avatar: null,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => updateUserData(state),
    onSuccess: async () => {
      await dispatch(loadUserDataAsync());
      setState((prevData) => ({ ...prevData, avatar: null }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setState((prevData) => ({ ...prevData, avatar: file }));
      }
    } else {
      setState((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <form className="mb-2 space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex items-end gap-10">
        <div>
          <label>Avatar</label>
          <div className="flex gap-3">
            <img src={user?.avatar} className="mt-2 w-16 rounded-full" />
            {state.avatar && (
              <img
                src={URL.createObjectURL(state.avatar)}
                className="mt-2 w-16 animate-pulse rounded-full border-4 border-blue-500"
              />
            )}
          </div>
        </div>
        <input type="file" name="avatar" accept="image/" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          First name
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          value={state.firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          Last name
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          value={state.lastname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          value={state.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          value={state.email}
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
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default AccountInfo;
