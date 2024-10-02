import { useEffect, useState, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from 'axios';

import { fetchStockNames, fetchStockDetail, buyStock, sellStock } from './api';
import { Chart, DataStateTypes } from 'components/Chart';

const Trade = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [buyData, setBuyData] = useState({ quantity: 0, stock: 0 });
  const [stockData, setStockData] = useState<DataStateTypes[]>([]);
  const queryClient = useQueryClient();

  const { data: stockNames, isLoading: stockNamesLoading } = useQuery('stock-name', fetchStockNames);

  const {
    data: stockDetailData,
    isLoading: stockDetailLoading,
    refetch: refetchStockDetail,
  } = useQuery(['stock-detail', selectedOption], () => fetchStockDetail(selectedOption), { enabled: !!selectedOption });

  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(e.target.value));
  }, []);

  const handleBuyData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBuyData((prevData) => ({ ...prevData, [e.target.name]: e.target.value, stock: selectedOption }));
    },
    [selectedOption],
  );

  const handleBuySubmission = useCallback(async () => {
    await buyStock(buyData.quantity, buyData.stock);
    await queryClient.refetchQueries('fetch-portfolio-data'); // await here to handle the promise
  }, [buyData, queryClient]);

  const handleSellSubmission = useCallback(async () => {
    await sellStock(buyData.quantity, buyData.stock);
  }, [buyData]);

  useEffect(() => {
    if (selectedOption) {
      void refetchStockDetail();
      const selectedStockSymbol = stockNames?.find((item) => item.id === selectedOption)?.symbol;
      if (selectedStockSymbol) {
        axios
          .get<DataStateTypes[]>(`/api/data/ohlc-data/${selectedStockSymbol}/`)
          .then((res) => {
            const formattedData: DataStateTypes[] = res.data.map((item) => ({
              open: Number(item.open),
              high: Number(item.high),
              low: Number(item.low),
              close: Number(item.close),
              time: new Date(item.time).toISOString().slice(0, 10),
            }));
            setStockData(formattedData);
          })
          .catch(() => toast.error('Error fetching stock candlestick data'));
      }
    }
  }, [selectedOption, refetchStockDetail, stockNames]);

  const isLoading = useMemo(() => stockNamesLoading || stockDetailLoading, [stockNamesLoading, stockDetailLoading]);

  return (
    <>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {stockNamesLoading ? (
          <option>Loading...</option>
        ) : (
          <>
            <option>Select a stock</option>
            {stockNames?.map((single) => (
              <option key={single.id} value={single.id}>
                {single.symbol}
              </option>
            ))}
          </>
        )}
      </select>

      <div className="mt-10">
        {isLoading ? (
          <section>Loading...</section>
        ) : (
          stockDetailData &&
          selectedOption && (
            <section className="mx-10 flex flex-col md:flex-row md:items-center">
              <div className="w-full text-center md:text-left">
                <h1 className="my-2 font-heading text-5xl">{stockDetailData.securityName}</h1>
                <Chart data={stockData} />
                <div className="text-center">
                  <p
                    className={`my-4 animate-pulse text-base ${
                      stockDetailData.lastTradedPrice > stockDetailData.previousClose
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Last Trading Price: {stockDetailData.lastTradedPrice}{' '}
                    {stockDetailData.lastTradedPrice > stockDetailData.previousClose ? (
                      <BsChevronDoubleUp className="inline-block animate-bounce text-base text-green-500" />
                    ) : (
                      <BsChevronDoubleDown className="inline-block animate-bounce text-base text-red-500" />
                    )}
                  </p>
                  <p className="my-4 text-base">Open Price: {stockDetailData.openPrice}</p>
                  <p className="my-4 text-base">High Price: {stockDetailData.highPrice}</p>
                  <p className="my-4 text-base">Low Price: {stockDetailData.lowPrice}</p>
                  <p className="my-4 text-base">Previous Close Price: {stockDetailData.previousClose}</p>
                </div>
              </div>

              <div className="w-full rounded-lg bg-white shadow md:ml-5 md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                  <h2 className="text-xl font-bold leading-tight tracking-tight">Position Entry</h2>
                  <div>
                    <label htmlFor="quantity" className="mb-2 block font-medium">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="quantity"
                      name="quantity"
                      onChange={handleBuyData}
                      value={buyData.quantity}
                      placeholder="Quantity"
                      min={0}
                      required
                    />
                  </div>
                  <button
                    onClick={handleBuySubmission}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy
                  </button>{' '}
                  <button
                    onClick={handleSellSubmission}
                    className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </section>
          )
        )}
      </div>
    </>
  );
};

export default Trade;
