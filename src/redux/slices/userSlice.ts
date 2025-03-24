import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import authService from '../../services/auth.service';

interface IUser {
  _id: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  error: string;
  isLoading: boolean;
}

const initialState: IUser = {
  _id: '',
  email: '',
  password: '',
  isLoggedIn: false,
  error: '',
  isLoading: false,
};

export const signup = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: { email: string; password: string }) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    return await authService.signUp(email, password);
  }
);

export const signin = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: { email: string; password: string }) => {
    await new Promise((res) => {
      setTimeout(res, 1000);
    });
    return await authService.signInWithPassword(email, password);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setInitialState: (state) => {
      state._id = initialState._id;
      state.email = initialState.email;
      state.password = initialState.password;
      state.isLoggedIn = initialState.isLoggedIn;
      state.error = initialState.error;
      state.isLoading = initialState.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state._id = action.payload ? action.payload : '';
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message ? action.error.message : '';
        state.isLoading = false;
      });
  },
});

export const { setEmail, setPassword, setError, setInitialState } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
