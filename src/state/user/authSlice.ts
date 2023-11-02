import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, UserState } from 'types/state/user/authSlice';

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = {
          firstname: action.payload?.firstname,
          lastname: action.payload?.lastname,
          email: action.payload?.email,
          username: action.payload?.username,
        };
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const loginAsync = createAsyncThunk('auth/loginAsync', async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post<UserState>('/api/accounts/token/', data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export default authSlice.reducer;
