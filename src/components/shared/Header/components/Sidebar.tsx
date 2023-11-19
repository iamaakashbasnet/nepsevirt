import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const sideNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node) &&
        !document.querySelector('#sidebar-toggler')?.contains(event.target as Node)
      ) {
        document.querySelector('#drawer-navigation')?.classList.remove('translate-x-0');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sidebarData = [
    {
      name: 'Overview',
      path: '',
    },
    {
      name: 'Portfolio',
      path: 'portfolio',
    },
    {
      name: 'Live Market',
      path: 'live-market',
    },
  ];

  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 md:translate-x-0"
      id="drawer-navigation"
      ref={sideNavRef}
    >
      <div className="h-full overflow-y-auto px-3 py-5">
        <ul className="space-y-2">
          {sidebarData.map((_) => (
            <li key={_.name}>
              <Link
                to={_.path}
                className="flex items-center rounded-lg p-2 text-base font-medium transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">{_.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
