import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'state/store';

const Settings = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [state, setState] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    username: user?.username,
    email: user?.email,
  });

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Account Settings</h1>

      <div className="rounded-md bg-gray-100 dark:bg-gray-500">
        <details className="border-b-2 p-2" open>
          <summary className="mb-3 cursor-pointer font-heading text-lg font-bold">Account Information</summary>
          <div className="ml-8">
            <form className="mb-2 space-y-4 md:space-y-6">
              <div className="flex items-end gap-10">
                <div>
                  <label>Avatar</label>
                  <img src={user?.avatar} className="mt-2 w-16 rounded-full" />
                </div>
                <input type="file" />
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
                  required
                />
              </div>
              <div>
                <button className="block rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Update
                </button>
              </div>
            </form>
          </div>
        </details>

        <details className="border-b-2 p-2">
          <summary className="mb-3 cursor-pointer font-heading text-lg font-bold">Password & Security</summary>
          <div className="ml-8">
            <p>Password & Security</p>
          </div>
        </details>
      </div>
    </section>
  );
};

export default Settings;
