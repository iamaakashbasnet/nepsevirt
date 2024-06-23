import axios from 'axios';
import { toast } from 'react-toastify';

export interface UserProfileTypes {
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  fund: {
    balance: number;
  };
  profitloss: {
    amount: number;
  };
  ranking: number;
}

export const fetchUserRanking = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const res = await axios.get<UserProfileTypes[]>(`/api/accounts/user-ranking/`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};
