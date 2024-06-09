import axios from 'axios';
import { toast } from 'react-toastify';

export interface StockData {
  id: number;
  name: string;
  ltp: number;
  open: number;
  high: number;
  low: number;
  close: number;
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
    const res = await axios.get<IsMarketOpen>('/api/officialapi/is-market-open/');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};
