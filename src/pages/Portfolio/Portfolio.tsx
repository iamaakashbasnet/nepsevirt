import { useQuery } from 'react-query';

import TradePLState from 'components/TradePLState';
import { fetchPortfolioData } from './api';

const Portfolio = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchPortfolioData(),
    queryKey: ['portfolio-data'],
  });

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Portfolio</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Stock
              </th>
              <th scope="col" className="px-4 py-3">
                Side
              </th>
              <th scope="col" className="px-4 py-3">
                Average Fill Price
              </th>
              <th scope="col" className="px-4 py-3">
                Quantity
              </th>
              <th scope="col" className="px-4 py-3">
                Investment
              </th>
              <th scope="col" className="px-4 py-3">
                Current Value
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="text-center" colSpan={4}>
                  Loading...
                </td>
              </tr>
            )}

            {data?.positions.map((position) => (
              <tr key={position.id} className="border-b dark:border-gray-700">
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {position.stock}
                </th>
                <td className={`px-4 py-3 ${position.side == 'SHORT' ? 'text-red-500' : 'text-green-500'}`}>
                  {position.side}
                </td>
                <td className="px-4 py-3">{position.average_fill_price}</td>
                <td className="px-4 py-3">{position.quantity}</td>
                <td className="px-4 py-3">Rs. {position.investment_value.toLocaleString('en-IN')}</td>
                <td className="flex items-center px-4 py-3">
                  Rs. {position.current_value.toLocaleString('en-IN')}
                  <TradePLState diffData={position.current_value - position.investment_value} />
                </td>
              </tr>
            ))}

            <tr className="border-b dark:border-gray-700">
              <td className="px-4 py-3 text-center font-bold text-white" colSpan={5}>
                TOTAL INVESTMENT
              </td>
              <td className="px-4 py-3">Rs. {data?.total_investment_value.toLocaleString('en-IN')}</td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="px-4 py-3 text-center font-bold text-white" colSpan={5}>
                EQUITY
              </td>
              <td>
                {data && (
                  <div className="flex items-center px-3">
                    Rs. {data.total_current_value.toLocaleString('en-IN')}
                    <TradePLState diffData={data.total_current_value - data.total_investment_value} />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Portfolio;
