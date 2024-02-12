import { useQuery } from 'react-query';

import { fetchLiveMarketData } from './api';

const LiveMarket = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchLiveMarketData(),
    queryKey: ['fetch-live-market-data'],
    refetchInterval: 120000,
  });

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Live Market</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-300 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                LTP
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

          <tbody className="text-white">
            {isLoading && (
              <tr className="border-b">
                <td className="animate-pulse py-3 text-center" colSpan={6}>
                  Loading...
                </td>
              </tr>
            )}

            {data?.map((stockData) => (
              <tr
                key={stockData.id}
                className={`border-b ${stockData.ltp < stockData.close ? 'bg-red-500' : 'bg-green-500'}`}
              >
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium">
                  {stockData.name}
                </th>
                <td className="px-4 py-3">{stockData.ltp}</td>
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
