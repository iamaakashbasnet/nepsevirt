import { useQuery } from 'react-query';

import { fetchLiveData } from './api';

const LiveMarket = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchLiveData(),
    queryKey: ['live-data'],
  });

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Live Market</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Open
              </th>
              <th scope="col" className="px-4 py-3">
                High
              </th>
              <th scope="col" className="px-4 py-3">
                Low
              </th>
              <th scope="col" className="px-4 py-3">
                Close
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="text-center" colSpan={5}>
                  Loading...
                </td>
              </tr>
            )}

            {data?.map((stockData) => (
              <tr key={stockData.id} className="border-b dark:border-gray-700">
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {stockData.name}
                </th>
                <td className="px-4 py-3">{stockData.open}</td>
                <td className="px-4 py-3">{stockData.high}</td>
                <td className="px-4 py-3">{stockData.low}</td>
                <td className="px-4 py-3">{stockData.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiveMarket;
