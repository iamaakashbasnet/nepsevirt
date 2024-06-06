import axios from 'axios';
import { toast } from 'react-toastify';

export interface UserProfileTypes {
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

export const updateUserData = async (data: UserProfileTypes) => {
  try {
    const res = await axios.patch<UserProfileTypes>('/api/accounts/user/me/update/', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    toast.success('Account information updated.');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};

export const passwordChange = async (data: StateProps) => {
  try {
    const res = await axios.post<StateProps>('/api/accounts/password-change/', data);
    toast.success('Password Changed.');
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      toast.error(err.response.data as string);
    }
  }
};
