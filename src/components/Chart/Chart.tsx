import { ColorType, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

export interface DataStateTypes {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const Chart = ({ data }: { data: DataStateTypes[] }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [candlestickSeries, setCandlestickSeries] = useState<ISeriesApi<'Candlestick'> | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // Default theme is dark

  // Themes configuration
  const themes = {
    dark: {
      background: { type: ColorType.Solid, color: '#131722' },
      textColor: '#d9d9d9',
      gridLinesColor: '#2B2B43',
      borderColor: '#2d2f4d',
    },
    light: {
      background: { type: ColorType.Solid, color: '#FFFFFF' },
      textColor: '#333333',
      gridLinesColor: '#CCCCCC',
      borderColor: '#CCCCCC',
    },
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      const newChart: IChartApi = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 600,
        layout: {
          background: themes[theme].background,
          textColor: themes[theme].textColor,
        },
        grid: {
          vertLines: {
            color: themes[theme].gridLinesColor,
          },
          horzLines: {
            color: themes[theme].gridLinesColor,
          },
        },
      });

      setChart(newChart);

      const newCandlestickSeries = newChart.addCandlestickSeries();
      setCandlestickSeries(newCandlestickSeries);

      return () => {
        newChart.remove();
      };
    }
  }, [theme]); // Re-render the chart when theme changes

  useEffect(() => {
    const handleResize = () => {
      if (chart) {
        chart.resize(chartContainerRef.current?.clientWidth || 0, 600);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [chart]);

  useEffect(() => {
    // Detect system theme preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEventInit) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    // Set initial theme based on system preference
    darkModeMediaQuery.addEventListener('change', listener);
    listener(darkModeMediaQuery); // Call listener initially to set the theme

    return () => {
      darkModeMediaQuery.removeEventListener('change', listener);
    };
  }, []);

  useEffect(() => {
    if (chart && candlestickSeries) {
      candlestickSeries.setData(data);
    }
  }, [chart, candlestickSeries, data]);

  return (
    <>
      <div
        ref={chartContainerRef}
        style={{ border: `2px solid ${themes[theme].borderColor}`, borderRadius: `.7rem` }}
      ></div>
    </>
  );
};
