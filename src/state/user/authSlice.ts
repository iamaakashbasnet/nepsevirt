import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
      /*
        Login
      */
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
      })

      /*
        Re auth
      */
      .addCase(reAuthAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reAuthAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(reAuthAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      /*
        Load user data
      */
      .addCase(loadUserDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserDataAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUserDataAsync.rejected, (state) => {
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

export const loadUserDataAsync = createAsyncThunk('auth/loadUserDataAsync', async (_, thunkAPI) => {
  try {
    const response = await axios.get<UserState>('/api/accounts/user/me/');
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to load user data');
  }
});

export const reAuthAsync = createAsyncThunk('auth/reAuthAsync', async (_, thunkAPI) => {
  return axios
    .post<UserState>('/api/accounts/token/refresh/')
    .then(async (response) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.at as string}`;
      await thunkAPI.dispatch(loadUserDataAsync());
    })
    .catch(() => {
      return thunkAPI.rejectWithValue('Re authentication failed.');
    });
});

export default authSlice.reducer;
