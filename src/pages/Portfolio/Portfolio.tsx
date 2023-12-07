import { useQuery } from 'react-query';
import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';

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
                Average Cost
              </th>
              <th scope="col" className="px-4 py-3">
                Total Quantity
              </th>
              <th scope="col" className="px-4 py-3">
                Total Investment
              </th>
              <th scope="col" className="px-4 py-3">
                Current Worth
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

            {data?.portfolio.map((portfolioData) => (
              <tr key={portfolioData.id} className="border-b dark:border-gray-700">
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {portfolioData.stock.name}
                </th>
                <td className="px-4 py-3">{portfolioData.avg_cost}</td>
                <td className="px-4 py-3">{portfolioData.total_quantity}</td>
                {/* TODO: Local currency format */}
                <td className="px-4 py-3">{portfolioData.total_investment}</td>
                <td className="flex items-center px-4 py-3">
                  Rs. {portfolioData.current_worth.toLocaleString(navigator.language || 'en-US')}
                  {portfolioData.current_worth > portfolioData.total_investment ? (
                    <div className="ml-2 flex items-center text-green-500">
                      ({portfolioData.current_worth - portfolioData.total_investment})
                      <BsChevronDoubleUp className={`ml-1 animate-bounce`} />
                    </div>
                  ) : (
                    <div className="ml-2 flex items-center text-red-500">
                      ({portfolioData.current_worth - portfolioData.total_investment})
                      <BsChevronDoubleDown className={`ml-1 animate-bounce`} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-b dark:border-gray-700">
              <td className="px-4 py-3 text-center font-bold text-white" colSpan={4}>
                TOTAL INVESTMENT
              </td>
              <td className="px-4 py-3">
                Rs. {data?.portfolio_investment.toLocaleString(navigator.language || 'en-US')}
              </td>
            </tr>
            <tr className="border-b dark:border-gray-700">
              <td className="px-4 py-3 text-center font-bold text-white" colSpan={4}>
                TOTAL WORTH
              </td>
              <td
                className={`flex items-center px-4 py-3 ${
                  data && data?.portfolio_worth > data?.portfolio_investment ? 'text-green-500' : 'text-red-500'
                }`}
              >
                Rs. {data?.portfolio_worth.toLocaleString(navigator.language || 'en-US')}{' '}
                {data && data?.portfolio_worth > data?.portfolio_investment ? (
                  <BsChevronDoubleUp className={`ml-2 animate-bounce text-base text-green-500`} />
                ) : (
                  <BsChevronDoubleDown className={`ml-2 animate-bounce text-base text-red-500`} />
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
