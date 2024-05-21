// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ColorType, createChart, IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export interface DataStateTypes {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const Chart = ({ data }: { data: DataStateTypes[] }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart: IChartApi = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 600,
        layout: {
          background: { type: ColorType.Solid, color: '#131722' },
          textColor: '#d9d9d9',
        },
        grid: {
          vertLines: {
            color: '#2B2B43',
          },
          horzLines: {
            color: '#2B2B43',
          },
        },
      });

      const candlestickSeries: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries();
      // candlestickSeries.setData(data);
      candlestickSeries.setData([
        { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 as UTCTimestamp },
        { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 as UTCTimestamp },
        { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 as UTCTimestamp },
        { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 as UTCTimestamp },
        { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 as UTCTimestamp },
        { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 as UTCTimestamp },
        { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 as UTCTimestamp },
        { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 as UTCTimestamp },
        { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 as UTCTimestamp },
        { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 as UTCTimestamp },
      ]);

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <>
      <div ref={chartContainerRef} style={{ border: `2px solid #2d2f4d`, borderRadius: `.7rem` }}></div>
    </>
  );
};
