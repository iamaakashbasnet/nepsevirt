import { useEffect, useState } from 'react';
import axios from 'axios';

import { Chart, DataStateTypes } from 'components/Chart';

const Dashboard = () => {
  const [data, setData] = useState<DataStateTypes[]>([]);

  useEffect(() => {
    axios
      .get<DataStateTypes[]>(`/api/data/historic-data/NEPSE/`)
      .then((res) => {
        const formattedData: DataStateTypes[] = res.data.map((item) => ({
          time: new Date(item.time).toISOString().slice(0, 10),
          value: item.value,
        }));
        setData(formattedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <h1 className="mb-5 font-heading text-3xl">Dashboard</h1>
      <div className="text-center">
        <Chart data={data} />
        <p className="my-5">NEPSE Index</p>
      </div>
    </section>
  );
};

export default Dashboard;
