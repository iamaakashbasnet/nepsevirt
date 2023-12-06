import axios from 'axios';

export interface StockNames {
  id: number;
  name: string;
}

export interface StockDetail extends StockNames {
  ltp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const fetchStockNames = async () => {
  try {
    const res = await axios.get<StockNames[]>('/api/data/live-data-stockname/');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchStockDetail = async (id: number) => {
  try {
    const res = await axios.get<StockDetail>(`/api/data/stock-detail/${id}/`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
