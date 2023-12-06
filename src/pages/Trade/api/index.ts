import axios from 'axios';
import { toast } from 'react-toastify';

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

export interface StockBuyResponse {
  stock: number;
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

export const buyStock = async (quantity: number, stock: number) => {
  try {
    const res = await axios.post<StockBuyResponse>(`/api/trade/buy/`, { quantity: Number(quantity), stock: stock });
    toast.success('Order executed successfully.');
    return res.data;
  } catch (err) {
    toast.success('Order failed to place.');
  }
};

export const sellStock = async (quantity: number, stock: number) => {
  try {
    const res = await axios.post<StockBuyResponse>(`/api/trade/sell/`, { quantity: Number(quantity), stock: stock });
    toast.success('Order executed successfully.');
    return res.data;
  } catch (err) {
    toast.error('Order failed to place.');
  }
};
