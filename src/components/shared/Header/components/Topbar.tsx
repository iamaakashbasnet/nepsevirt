import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import logo from 'assets/logo.png';

const Topbar = () => {
  return (
    <nav className="navbar z-20 bg-base-300">
      <div className="flex-1">
        <a
          className="btn btn-ghost font-heading text-xl normal-case md:hidden"
          id="sidebar-toggler"
          onClick={() => {
            document.querySelector('#drawer-navigation')?.classList.toggle('translate-x-0');
          }}
        >
          <FiMenu />
        </a>
        <a className="btn btn-ghost font-heading text-xl normal-case">
          <img className="h-8" src={logo} alt="NEPSE Virt logo" />
          NEPSE Virt
        </a>
      </div>
      <div className="flex-none">
        <details className="dropdown dropdown-end">
          <summary tabIndex={0} className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png" />
            </div>
          </summary>
          <ul tabIndex={0} className="menu dropdown-content rounded-box z-[1] mt-3 w-52 bg-base-300 p-2 shadow">
            <li>
              <Link to="test">Profile</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
};

export default Topbar;
