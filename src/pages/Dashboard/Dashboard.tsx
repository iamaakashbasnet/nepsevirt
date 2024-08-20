import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useQueries } from 'react-query';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

import { RootState } from 'state/store';
import { Chart, DataStateTypes } from 'components/Chart';
import { fetchMainIndices, fetchSubIndices } from './api';

const Dashboard = () => {
  const [data, setData] = useState<DataStateTypes[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const results = useQueries([
    {
      queryKey: ['fetch-main-indices'],
      queryFn: fetchMainIndices,
      // refetchInterval: 20000,
    },
    {
      queryKey: ['fetch-sub-indices'],
      queryFn: fetchSubIndices,
      // refetchInterval: 20000,
    },
  ]);

  const mainIndices = results[0].data;
  const subIndices = results[1].data;
  const isLoading = results.some((result) => result.isLoading);

  useEffect(() => {
    toast.info('Buy/Sell will soon be replaced by Trading Panel');
    axios
      .get<DataStateTypes[]>(`/api/data/ohlc-data/NEPSE Index/`)
      .then((res) => {
        const formattedData: DataStateTypes[] = res.data.map((item) => ({
          open: Number(item.open),
          high: Number(item.high),
          low: Number(item.low),
          close: Number(item.close),
          time: new Date(item.time).toISOString().slice(0, 10),
        }));
        setData(formattedData);
      })
      .catch(() => toast.error('Error fetching data'));
  }, []);

  return (
    <>
      <section>
        {user && (
          <>
            <h1 className="mb-5 font-heading text-3xl">Dashboard</h1>
            <div className="md:flex md:w-full md:items-center md:justify-between">
              <div className="w-full md:w-2/6">
                <div className="mb-8 rounded-md bg-gradient-to-r from-cyan-500 to-gray-500 p-5 text-white">
                  <h2 className="text-2xl font-bold">Funds</h2>
                  <p>Total amount: {user?.fund.balance}</p>
                </div>
                <div
                  className={`animate-pulse rounded-md bg-gradient-to-r ${
                    user.profitloss.amount < 0
                      ? 'from-red-500 from-50% to-emerald-500 to-100%'
                      : 'from-emerald-500 from-50% to-red-500 to-100%'
                  }  p-5 text-white`}
                >
                  <h2 className="text-2xl font-bold">Overall P/L</h2>
                  <p>Total Loss: Rs.{user.profitloss.amount}</p>
                </div>
              </div>
              <div className="w-full text-center md:w-3/5">
                <Chart data={data} />
                <p className="mt-4">NEPSE Index Chart</p>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="mt-8">
        <h1 className="mb-5 font-heading text-3xl">Market Overview</h1>
        <div className="flex justify-between gap-5">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <h5 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white">Main Indices</h5>
            <div className="flow-root">
              {isLoading && <p>Loading...</p>}
              {mainIndices && (
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mainIndices.map((index) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center gap-10">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{index.index}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {index.currentValue}&nbsp;&nbsp;({index.perChange}{' '}
                          {index.perChange > 0 ? (
                            <HiArrowTrendingUp color="green" />
                          ) : (
                            <HiArrowTrendingDown color="red" />
                          )}
                          )
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <h5 className="mb-4 text-xl font-bold leading-none text-gray-900 dark:text-white">Sub Indices</h5>
            <div className="flow-root">
              {isLoading && <p>Loading...</p>}
              {subIndices && (
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {subIndices.map((index) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center gap-10">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{index.index}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {index.currentValue}&nbsp;&nbsp;({index.perChange}{' '}
                          {index.perChange > 0 ? (
                            <HiArrowTrendingUp color="green" />
                          ) : (
                            <HiArrowTrendingDown color="red" />
                          )}
                          )
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
