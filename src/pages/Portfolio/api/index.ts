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
  current_worth: number;
}

export interface ResponseData {
  portfolio: Portfolio[];
  portfolio_investment: number;
  portfolio_worth: number;
}

export const fetchPortfolioData = async () => {
  try {
    const res = await axios.get<ResponseData>('/api/portfolio/list-stocks/');
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
