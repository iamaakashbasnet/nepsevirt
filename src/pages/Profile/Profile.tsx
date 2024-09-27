import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { fetchUserProfileData } from './api';

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

          <div className="w-full md:w-1/2">
            <h1 className="font-heading text-lg font-bold">
              Minds <span className="animate-pulse text-sm text-blue-600/75 dark:text-blue-500/75">Coming soon*</span>
            </h1>
            <div
              role="status"
              className="animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow md:p-6 dark:divide-gray-700 dark:border-gray-700"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between pt-4">
                  <div>
                    <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              ))}
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Profile;
