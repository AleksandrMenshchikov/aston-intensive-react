import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserId } from '../../types/User';
import userService from '../../services/user.service';
import authService, { AuthPayload } from '../../services/auth.service';
import tokenService from '../../services/token.service';
import { RootState } from '../store';
import { userApi } from '../api/userApi';

// Инициализация состояния
const initialState: UserState = {
  userData: null,
  isLogged: Boolean(tokenService.getAuth()),
  isLoading: false,
  dataIsLoaded: false,
  error: null,
};

const sliceName = 'user';

// Асинхронные Thunk'и
export const loadUserData = createAsyncThunk(
  sliceName + '/loadUserData',
  async (_, thunkAPI) => {
    const userId = tokenService.getAuth();
    if (!userId) return thunkAPI.rejectWithValue('Пользователь не авторизован');
    try {
      return await userService.getUserInfo(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// TODO разобраться и убрать дизейбл
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = createAsyncThunk<any, Partial<User>>(
  sliceName + '/updateUser',
  async (payload, thunkApi) => {
    const updatingUser = tokenService.getAuth();
    if (updatingUser) {
      return await userService.updateUser(updatingUser, payload);
    } else {
      return thunkApi.rejectWithValue('Пользователь не авторизирован');
    }
  }
);

export const signUp = createAsyncThunk<UserId, AuthPayload>(
  sliceName + 'signUp',
  async (payload, thunkAPI) => {
    try {
      const userId = await thunkAPI
        .dispatch(userApi.endpoints.signUp.initiate(payload))
        .unwrap();
      tokenService.setAuth(userId);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk<UserId, AuthPayload>(
  sliceName + 'signIn',
  async (payload, thunkAPI) => {
    try {
      const userId = await authService.signInWithPassword(payload);
      tokenService.setAuth(userId);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk<void, void>(
  sliceName + 'logOut',
  async (_, thunkAPI) => {
    try {
      tokenService.clearAuth();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Создание userSlice
const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state) => {
        state.dataIsLoaded = true;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.dataIsLoaded = true;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLogged = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLogged = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLogged = false;
        state.userData = null;
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

// Селекторы
export const getUser = (state: RootState): User | null => state.user.userData;
export const getLoginStatus = (state: RootState): boolean =>
  state.user.isLogged;
export const getUserDataStatus = (state: RootState): boolean =>
  state.user.dataIsLoaded;

// Тип состояния пользователя
type UserState = {
  userData: User | null;
  isLogged: boolean;
  dataIsLoaded: boolean;
  error: unknown;
  isLoading: boolean;
};
