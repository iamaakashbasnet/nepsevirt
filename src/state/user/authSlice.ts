import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AuthState, UserState } from 'types/state/user/authSlice';

export interface FormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  firstname: string;
  lastname: string;
  username: string;
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
      })

      /*
        Logout
      */
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const loginAsync = createAsyncThunk('auth/loginAsync', async (formData: FormData, thunkAPI) => {
  try {
    const response = await axios.post<UserState>('/api/accounts/token/', formData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.at as string}`;
    toast.success('Login successful');
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
      toast.success(`Welcome back`);
    })
    .catch(() => {
      return thunkAPI.rejectWithValue('Re authentication failed.');
    });
});

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async (_, thunkAPI) => {
  return axios
    .post<{ res: AxiosResponse }>('/api/accounts/token/blacklist/')
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return thunkAPI.rejectWithValue('Something went wrong, cannot logout.');
    });
});

export const signupAsync = createAsyncThunk('auth/signupAsync', async (signupFormData: SignupFormData, thunkAPI) => {
  return axios
    .post('/api/accounts/signup/', signupFormData)
    .then(() => {
      toast.success('Account created, now you can login.');
    })
    .catch(() => {
      toast.error('Something went wrong.');
      return thunkAPI.rejectWithValue('Something went wrong.');
    });
});

export default authSlice.reducer;
