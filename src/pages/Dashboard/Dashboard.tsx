import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { RootState } from 'state/store';
import { Chart, DataStateTypes } from 'components/Chart';

const Dashboard = () => {
  const [data, setData] = useState<DataStateTypes[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  // BUG: Not able to chart NEPSE data
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
        console.log(formattedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Dashboard</h1>
      <div className="md:flex md:w-full md:items-center md:justify-between">
        <div className="w-full md:w-2/6">
          <div className="mb-8 rounded-md bg-gradient-to-r from-cyan-500 to-gray-500 p-5">
            <h2 className="text-2xl font-bold">Funds</h2>
            <p>Total amount: {user?.fund.balance}</p>
          </div>
          <div className="animate-pulse rounded-md bg-gradient-to-r from-red-500 from-50% to-emerald-500 to-100% p-5">
            <h2 className="text-2xl font-bold">P/L</h2>
            <p>Total Loss: Rs.-5000</p>
          </div>
        </div>
        <div className="w-3/5 text-center">
          <Chart data={data} />
          <p className="mt-4">NEPSE Index Chart</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
