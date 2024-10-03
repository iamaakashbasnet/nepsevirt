import { useQuery } from 'react-query';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

import { fetchMainIndices, fetchSubIndices } from './../api/index';
import { MAIN_INDICES } from './../Dashboard';

const IndicesList = ({ indicesType }: { indicesType: string }) => {
  const { data: indicesData, isLoading } = useQuery({
    queryFn: indicesType == MAIN_INDICES ? fetchMainIndices : fetchSubIndices,
    queryKey: [indicesType == MAIN_INDICES ? 'fetch-main-indices' : 'fetch-sub-indices'],
  });

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-8 dark:border-gray-700 dark:bg-gray-800">
      <h5 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white">
        {indicesType == MAIN_INDICES ? 'Main Indices' : 'Sub Indices'}
      </h5>
      <div className="flow-root">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {indicesData?.map((index) => (
              <li key={index.id} className="py-3 sm:py-4">
                <div className="flex items-center gap-10">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{index.index}</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {index.currentValue}&nbsp;&nbsp;({index.perChange}{' '}
                    {index.perChange > 0 ? <HiArrowTrendingUp color="green" /> : <HiArrowTrendingDown color="red" />})
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IndicesList;
