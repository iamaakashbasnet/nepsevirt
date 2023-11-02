import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, UserState } from 'types/state/user/authSlice';

interface FormData {
  email: string;
  password: string;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
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
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const loginAsync = createAsyncThunk('auth/loginAsync', async (formData: FormData, thunkAPI) => {
  try {
    const response = await axios.post<UserState>('/api/accounts/token/', formData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.at as string}`;
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Credentials invalid.');
  }
});

export default authSlice.reducer;
