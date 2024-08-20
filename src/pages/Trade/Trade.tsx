import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { BsChevronDoubleUp, BsChevronDoubleDown } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from 'axios';

import { fetchStockNames, fetchStockDetail, buyStock, sellStock } from './api';
import { Chart, DataStateTypes } from 'components/Chart';

// TODO: Refactoring needed
const Trade = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [buyData, setBuyData] = useState({ quantity: 0, stock: 0 });
  const [stockData, setStockData] = useState<DataStateTypes[]>([]);
  const queryCLient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: () => fetchStockNames(),
    queryKey: ['stock-name'],
  });

  const {
    data: stockDetailData,
    isLoading: stockDetailIsLoading,
    isSuccess: stockDetailSuccess,
    isRefetching: stockDetailIsRefetching,
    refetch,
  } = useQuery({
    queryFn: () => fetchStockDetail(selectedOption),
    queryKey: ['stock-detail'],
    enabled: false,
  });

  const handleBuyData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyData((prevData) => ({ ...prevData, [e.target.name]: e.target.value, stock: selectedOption }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(e.target.value));
  };

  const handleBuySubmission = async () => {
    await buyStock(buyData.quantity, buyData.stock);
    await queryCLient.refetchQueries('fetch-portfolio-data');
  };

  const handleSellSubmission = async () => {
    await sellStock(buyData.quantity, buyData.stock);
  };

  useEffect(() => {
    if (selectedOption != 0) {
      void refetch();
      axios
        .get<DataStateTypes[]>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/api/data/ohlc-data/${data?.find((item) => item.id === selectedOption)?.symbol}/`,
        )
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
  }, [refetch, selectedOption, data]);

  return (
    <>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {isLoading ? (
          <option>Loading...</option>
        ) : (
          <>
            <option>Select a stock</option>
            {data?.map((single) => (
              <option key={single.id} value={single.id}>
                {single.symbol}
              </option>
            ))}
          </>
        )}
      </select>

      <div className="mt-10">
        {stockDetailIsLoading ? (
          <section>Loading...</section>
        ) : stockDetailIsRefetching ? (
          <section>Loading...</section>
        ) : (
          stockDetailSuccess &&
          selectedOption !== 0 && (
            <section className="mx-10 flex flex-col md:flex-row md:items-center">
              <div className="w-full text-center md:text-left">
                <h1 className="my-2 font-heading text-5xl">{stockDetailData?.securityName}</h1>
                <Chart data={stockData} />
                <div className="text-center">
                  <p
                    className={`my-4 animate-pulse text-base ${
                      stockDetailData && stockDetailData?.lastTradedPrice > stockDetailData?.previousClose
                        ? `text-green-500`
                        : `text-red-500`
                    }`}
                  >
                    Last Trading Price: {stockDetailData?.lastTradedPrice}{' '}
                    {stockDetailData && stockDetailData?.lastTradedPrice > stockDetailData?.previousClose ? (
                      <BsChevronDoubleUp className={`inline-block animate-bounce text-base text-green-500`} />
                    ) : (
                      <BsChevronDoubleDown className={`inline-block animate-bounce text-base text-red-500`} />
                    )}
                  </p>
                  <p className="my-4 text-base">Open Price: {stockDetailData?.openPrice}</p>
                  <p className="my-4 text-base">High Price: {stockDetailData?.highPrice}</p>
                  <p className="my-4 text-base">Low Price: {stockDetailData?.lowPrice}</p>
                  <p className="my-4 text-base">Previous Close Price: {stockDetailData?.previousClose}</p>
                </div>
              </div>

              <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:ml-5 md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                  <h2 className="text-xl font-bold leading-tight tracking-tight">Position Entry</h2>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-medium">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
