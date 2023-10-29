import React from 'react';
import { TbSquareRoundedChevronDownFilled } from 'react-icons/tb';

const Sidebar: React.FC = () => {
  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 md:translate-x-0"
        id="drawer-navigation"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="ml-3">Overview</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex-1 whitespace-nowrap">Portfolio</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                data-collapse-toggle="dropdown-pages"
              >
                <span className="ml-3 flex-1 whitespace-nowrap text-left">Position</span>
                <TbSquareRoundedChevronDownFilled />
              </button>
              <ul id="dropdown-pages" className="hidden space-y-2 py-2">
                <li>
                  <a
                    href="#"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Buy/Sell
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Trading History
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Account History
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
