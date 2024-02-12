import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';

import logo from 'assets/logo.png';
import { AppDispatch, RootState } from 'state/store';
import { logoutAsync } from 'state/user/authSlice';

interface DropdownProps {
  open: boolean;
  dropdownHandler: () => void;
}

const Dropdown = ({ open, dropdownHandler }: DropdownProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const dropdownMenuData = [
    {
      name: 'Profile',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      path: `profile/${user?.username}`,
    },
    {
      name: 'Account Settings',
      path: 'settings',
    },
  ];

  const logoutHandler = async () => {
    await dispatch(logoutAsync());
  };

  return (
    <div
      className={`absolute right-2 top-10 z-50 my-4 ${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        !open && 'hidden'
      } w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
      id="dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {user?.firstname} {user?.lastname}
        </span>
      </div>
      <ul className="py-1 text-gray-700 dark:text-gray-300">
        {dropdownMenuData.map((_) => (
          <li key={_.name} onClick={dropdownHandler}>
            <Link
              to={_.path}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {_.name}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={logoutHandler}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const dropdownHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="sidebar-toggler"
              onClick={() => {
                document.querySelector('#drawer-navigation')?.classList.toggle('translate-x-0');
              }}
              className="mr-2 cursor-pointer rounded-lg p-2 text-2xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
            >
              <FiMenu />
            </button>

            <a href="/" className="mr-4 flex items-center justify-between">
              <img src={logo} className="mr-3 h-8" alt="NepseVirt Logo" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">NEPSE Virt</span>
            </a>
          </div>

          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
              id="user-menu-button"
              onClick={dropdownHandler}
            >
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={user?.avatar} alt="User photo" />
            </button>

            <Dropdown open={open} dropdownHandler={dropdownHandler} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
