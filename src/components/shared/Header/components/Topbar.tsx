import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import logo from 'assets/logo.png';
import { AppDispatch, RootState } from 'state/store';
import { logoutAsync } from 'state/user/authSlice';

const Topbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const logoutHandler = async () => {
    await dispatch(logoutAsync());
  };

  return (
    <nav className="navbar z-20 bg-slate-100 dark:bg-base-300">
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
              <img src={user?.avatar} />
            </div>
          </summary>

          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] mt-3 w-52 bg-slate-100 p-2 dark:bg-base-300"
          >
            <span className="text-grey-900 mb-3 text-center font-bold dark:text-white">
              Signed in as {user?.firstname} {user?.lastname}
            </span>
            <li>
              <Link to="test">Profile</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
};

export default Topbar;
