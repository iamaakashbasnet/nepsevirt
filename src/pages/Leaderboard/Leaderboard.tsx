import { useQuery } from 'react-query';
import { fetchUserRanking } from './api';

const Leaderboard = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchUserRanking(),
    queryKey: ['fetch-user-ranking'],
  });

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-300 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Trader
              </th>
              <th scope="col" className="px-4 py-3">
                Ranking
              </th>
              <th scope="col" className="px-4 py-3">
                Overall P/L
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr className="border-b">
                <td className="animate-pulse py-3 text-center" colSpan={6}>
                  Loading...
                </td>
              </tr>
            )}

            {data?.map((single, index) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="flex items-center gap-5 px-4 py-3">
                  <img className="h-6 w-6 rounded-full" src={single.avatar} alt="Trader photo" />
                  {single.firstname} {single.lastname}
                </td>
                <td className="px-4 py-3">{single.ranking}</td>
                <td className="px-4 py-3">Rs. {single.profitloss.amount.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
