import axios from 'axios';

export interface Position {
  id: number;
  stock: string;
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
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
