import axios from 'axios';
import { toast } from 'react-toastify';

export interface UserProfile {
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  email: string | undefined;
}

export const updateUserData = async (data: UserProfile) => {
  try {
    const res = await axios.patch<UserProfile>('/api/accounts/user/me/update/', data);
    toast.success('Account information updated.');
    return res.data;
  } catch (err) {
    toast.error('Something went wrong.');
  }
};
