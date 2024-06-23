import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { fetchUserProfileData } from './api';

const RenderChart = () => {
  const chartData = [
    {
      name: 'Jan',
      profit: 0,
    },
    {
      name: 'Feb',
      profit: 5000,
    },
    {
      name: 'Mar',
      profit: 3000,
    },
    {
      name: 'Apr',
      profit: 5000,
    },
    {
      name: 'May',
      profit: 6000,
    },
    {
      name: 'Jun',
      profit: 8000,
    },
    {
      name: 'Jul',
      profit: 6490,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="profit" stroke="#8884d8" className="animate-pulse" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Profile = () => {
  const { username } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => fetchUserProfileData(username),
    queryKey: ['fetch-user-profile-data'],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="text-center">
        <div className="dark: h-60 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        <img
          src={data?.avatar}
          className="mx-auto -mt-10 mb-5 w-36 rounded-full border-4 border-gray-400"
          alt="User profile pic"
        />
        <h1 className="font-heading text-3xl">
          {data?.firstname} {data?.lastname}
        </h1>
      </div>

      <section className="mt-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="font-heading text-lg font-bold">Trader Stats</h1>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data && (
                <>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center justify-between rtl:space-x-reverse">
                      <div className="flex-shrink-0">
                        {data.profitloss.amount > 0 ? (
                          <>
                            <span className="animate-pulse font-bold text-emerald-500">P</span> / L
                          </>
                        ) : (
                          <>
                            P / <span className="animate-pulse font-bold text-red-500">L</span>
                          </>
                        )}
                      </div>
                      <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                        Rs.{data.profitloss.amount}
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center justify-between rtl:space-x-reverse">
                      <div className="flex-shrink-0">Ranking</div>
                      <div className="inline-flex items-center text-base text-gray-900 dark:text-white">
                        {data.ranking}
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="w-full text-center md:w-1/2">
            <RenderChart />
            <p>Ranking Graph</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Profile;
