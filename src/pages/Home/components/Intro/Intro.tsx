import React from 'react';
import { LuCheckCircle } from 'react-icons/lu';
import { PiPlugsConnectedFill } from 'react-icons/pi';
import { LuLayoutDashboard } from 'react-icons/lu';
import dashboardMockupDark from 'assets/dashboard-mockup-dark.svg';
import dashboardMockupLight from 'assets/dashboard-mockup-light.svg';

const Intro: React.FC = () => {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === `dark` ? true : false;
  return (
    <>
      <div className="-mt-32 flex flex-col items-center justify-center">
        <img className="z-50 block w-2/4" src={isDarkMode ? dashboardMockupDark : dashboardMockupLight} />

        <div className="px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <div className="my-12 flex flex-wrap items-center justify-center">
            <div className="mx-16 flex flex-col items-center">
              <h1 className="mb-5 text-7xl">
                <LuCheckCircle />
              </h1>
              <p>100% Free</p>
            </div>

            <div className="mx-16 flex flex-col items-center">
              <h1 className="mb-5 text-7xl">
                <PiPlugsConnectedFill />
              </h1>
              <p>Real Time Data</p>
            </div>

            <div className="mx-16 flex flex-col items-center">
              <h1 className="mb-5 text-7xl">
                <LuLayoutDashboard />
              </h1>
              <p>Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
