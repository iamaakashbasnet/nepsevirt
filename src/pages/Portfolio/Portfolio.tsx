import { useQuery } from 'react-query';

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

            {data?.map((portfolioData) => (
              <tr key={portfolioData.id} className="border-b dark:border-gray-700">
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {portfolioData.stock.name}
                </th>
                <td className="px-4 py-3">{portfolioData.avg_cost}</td>
                <td className="px-4 py-3">{portfolioData.total_quantity}</td>
                <td className="px-4 py-3">{portfolioData.total_investment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Portfolio;
