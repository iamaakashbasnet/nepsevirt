import axios from 'axios';

export interface UserProfile {
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
}

export const userProfileData = async (username: string | undefined) => {
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const res = await axios.get<UserProfile>(`/api/accounts/profile/${username}/`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
