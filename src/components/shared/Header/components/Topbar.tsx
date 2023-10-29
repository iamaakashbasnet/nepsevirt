import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import logo from 'assets/logo.png';

const Topbar: React.FC = () => {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              className="mr-2 cursor-pointer rounded-lg p-2 text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
            >
              <RxHamburgerMenu />
            </button>
            <a href="/" className="mr-4 flex items-center justify-between">
              <img src={logo} className="mr-3 h-8" alt="Flowbite Logo" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">NEPSE Virt</span>
            </a>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
              id="user-menu-button"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                alt="user photo"
              />
            </button>

            {/* Dropdown menu  */}
            <div
              className="z-50 my-4 hidden w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
              id="dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">Neil Sims</span>
                <span className="block truncate text-sm text-gray-900 dark:text-white">name@flowbite.com</span>
              </div>
              <ul className="py-1 text-gray-700 dark:text-gray-300">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Account settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
