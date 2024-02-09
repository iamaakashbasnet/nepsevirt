import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataState {
  time: string;
  value: number;
}

interface ChartProps {
  data: DataState[];
  yDomain: number[];
}

const Chart = ({ data, yDomain }: ChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis orientation="right" domain={yDomain} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#374151" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
