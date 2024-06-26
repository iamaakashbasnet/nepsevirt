import axios from 'axios';
import { toast } from 'react-toastify';

export interface StockData {
  id: number;
  security: {
    id: number;
    symbol: string;
    securituName: string;
  };
  lastTradedPrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  previousClose: number;
}

export interface IsMarketOpen {
  isOpen: string;
  asOf: string;
  id: number;
}

export const fetchLiveMarketData = async () => {
  try {
    const res = await axios.get<StockData[]>('/api/data/live-data/');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
    // if (axios.isAxiosError(err) && err.response) {
    //   toast.error((err.response.data as { detail: string }).detail);
    // }
  }
};

export const isMarketOpen = async () => {
  try {
    const res = await axios.get<IsMarketOpen>('/api/data/is-market-open/');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};
