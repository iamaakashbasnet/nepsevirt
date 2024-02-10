import axios from 'axios';
import { toast } from 'react-toastify';

export interface UserProfile {
  firstname: string | undefined;
  lastname: string | undefined;
  username: string | undefined;
  email: string | undefined;
  avatar: undefined | null | File;
}

export interface StateProps {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export const updateUserData = async (data: UserProfile) => {
  try {
    const res = await axios.patch<UserProfile>('/api/accounts/user/me/update/', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    toast.success('Account information updated.');
    return res.data;
  } catch (err) {
    toast.error('Something went wrong.');
  }
};

export const passwordChange = async (data: StateProps) => {
  try {
    const res = await axios.post<StateProps>('/api/accounts/password-change/', data);
    toast.success('Password Changed.');
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    toast.error('Something went wrong.');
  }
};
