import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { RootState } from 'state/store';
import { Chart, DataStateTypes } from 'components/Chart';

const Dashboard = () => {
  const [data, setData] = useState<DataStateTypes[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    axios
      .get<DataStateTypes[]>(`/api/data/historic-data/NEPSE Index/`)
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
  );
};

export default Dashboard;
