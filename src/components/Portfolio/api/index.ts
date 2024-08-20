import axios from 'axios';
import { toast } from 'react-toastify';

export interface Position {
  id: number;
  security: {
    id: number;
    symbol: string;
    securityName: string;
  };
  average_fill_price: number;
  investment_value: number;
  current_value: number;
  side: string;
  quantity: number;
  portfolio: number;
}

export interface Portfolio {
  positions: Position[];
}

export const fetchPortfolioData = async () => {
  try {
    const res = await axios.get<Portfolio>('/api/portfolio/list-stocks/');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};
