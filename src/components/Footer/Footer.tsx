import { Link } from 'react-router-dom';

import logo from 'assets/logo.png';

const Footer = () => {
  const footerData = [
    {
      name: 'About',
      path: 'about',
    },
    {
      name: 'Privacy Policy',
      path: 'privacy-policy',
    },
    {
      name: 'Licensing',
      path: 'licensing',
    },
    {
      name: 'Contact',
      path: 'contact',
    },
  ];

  return (
    <footer className="mt-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="mb-4 flex items-center sm:mb-0">
            <img src={logo} className="mr-3 h-8" alt="NEPSE Virt logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">NEPSE Virt</span>
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {footerData.map((data) => (
              <li key={data.name}>
                <Link to={`/${data.path}`} className="mr-4 hover:underline md:mr-6 ">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />

        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
          <a href="/" className="hover:underline">
            NEPSE Virt™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
