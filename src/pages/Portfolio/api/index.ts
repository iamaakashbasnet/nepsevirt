import axios from 'axios';

export interface StockData {
  id: number;
  name: string;
}

export interface Portfolio {
  id: number;
  stock: StockData;
  total_quantity: number;
  total_investment: number;
  avg_cost: number;
  portfolio: number;
}

export const fetchPortfolioData = async () => {
  try {
    const res = await axios.get<Portfolio[]>('/api/portfolio/list-stocks/');
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
