import axios from 'axios';

export interface StockData {
  id: number;
  name: string;
  ltp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const fetchLiveMarketData = async () => {
  try {
    const res = await axios.get<StockData[]>('/api/data/live-data/');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
