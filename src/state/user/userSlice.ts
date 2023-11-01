import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
