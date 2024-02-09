import { useEffect, useState } from 'react';
import axios from 'axios';

import Chart from 'components/Chart';

interface DataState {
  time: string;
  value: number;
}

const Dashboard = () => {
  const [data, setData] = useState<DataState[]>([]);

  useEffect(() => {
    axios
      .get<DataState[]>(`/api/data/historic-data/NEPSE/`)
      .then((res) => {
        const formattedData: DataState[] = res.data.map((item) => ({
          time: new Date(item.time).toISOString().slice(0, 10),
          value: item.value,
        }));
        setData(formattedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const yDomain = [
    Math.min(...data.map((entry) => Math.min(entry.value))),
    Math.max(...data.map((entry) => Math.max(entry.value))),
  ];

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Dashboard</h1>
      <div className="text-center">
        <Chart data={data} yDomain={yDomain} />
        <p className="my-5">NEPSE Index</p>
      </div>
    </section>
  );
};

export default Dashboard;
