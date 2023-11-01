import React from 'react';
import logo from 'assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="mt-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="mb-4 flex items-center sm:mb-0">
            <img src={logo} className="mr-3 h-8" alt="NEPSE Virt logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">NEPSE Virt</span>
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()}{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            NEPSE Virt™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
