import axios from 'axios';
import { toast } from 'react-toastify';

export interface MainIndicesTypes {
  id: number;
  index: string;
  close: number;
  high: number;
  low: number;
  previousClose: number;
  change: number;
  perChange: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  currentValue: number;
}

export interface SubIndicesTypes {
  id: number;
  index: string;
  change: number;
  perChange: number;
  currentValue: number;
}

export const fetchMainIndices = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const res = await axios.get<MainIndicesTypes[]>(`/api/data/main-indices/`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};

export const fetchSubIndices = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const res = await axios.get<SubIndicesTypes[]>(`/api/data/sub-indices/`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};
