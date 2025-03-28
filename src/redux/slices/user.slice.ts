import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { User } from '../../types/User';
import tokenService from '../../services/token.service';
import { RootState } from '../store';
import { AuthPayload, userApi } from '../api/userApi';
import { WritableDraft } from 'immer';
import fakeServer from '../../backend/api/fakeServer';
import { IHistoryRequest, IHistoryResponse } from '../../types/interfaces';

const initialState: UserState = {
  userData: null,
  isLogged: Boolean(tokenService.getAuth()),
  isLoading: false,
  dataIsLoaded: false,
  error: null,
};

const sliceName = 'user';

export const loadUserData = createAsyncThunk<User, void>(
  sliceName + '/loadUserData',
  async (_, thunkAPI) => {
    const userId = tokenService.getAuth();
    if (!userId) return thunkAPI.rejectWithValue('Пользователь не авторизован');
    try {
      const payload = tokenService.getAuth();
      // Этот и все остальные Thunk'и возвращают не то, что идет после return, а объект где целевой результат находится под ключем payload.
      return await thunkAPI
        .dispatch(userApi.endpoints.getUserById.initiate([payload]))
        .unwrap();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<Partial<User | null>, Partial<User>>(
  sliceName + '/updateUser',
  async (payload, thunkApi) => {
    const updatingUser = tokenService.getAuth();
    if (updatingUser) {
      return await thunkApi
        .dispatch(
          userApi.endpoints.updateUser.initiate([{ id: updatingUser, payload }])
        )
        .unwrap();
    } else {
      return thunkApi.rejectWithValue('Пользователь не авторизирован');
    }
  }
);

export const signUp = createAsyncThunk<boolean, AuthPayload>(
  sliceName + '/signUp',
  async (payload, thunkAPI) => {
    try {
      const userId = await thunkAPI
        .dispatch(userApi.endpoints.signUp.initiate([payload]))
        .unwrap();
      console.log(userId);
      tokenService.setAuth(userId);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk<boolean, AuthPayload>(
  sliceName + '/signIn',
  async (payload, thunkAPI) => {
    try {
      const userId = await thunkAPI
        .dispatch(userApi.endpoints.signIn.initiate([payload]))
        .unwrap();
      console.log(userId);
      tokenService.setAuth(userId);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk<void, void>(
  sliceName + '/logOut',
  async (_, thunkAPI) => {
    try {
      tokenService.clearAuth();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const saveHistory = createAsyncThunk<IHistoryResponse, IHistoryRequest>(
  sliceName + '/saveHistory',
  async (data) => {
    return await fakeServer.saveHistory(data);
  }
);

export const getUserHistoriesById = createAsyncThunk<string[], User['_id']>(
  sliceName + '/getUserHistoriesById',
  async (userId) => {
    await new Promise((res) => setTimeout(res, 1000));
    return await fakeServer.getUserHistoriesById(userId);
  }
);

const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.userData = initialState.userData;
      state.isLogged = initialState.isLogged;
      state.isLoading = initialState.isLoading;
      state.dataIsLoaded = initialState.dataIsLoaded;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, setIsLoading)
      .addCase(loadUserData.fulfilled, setUserData)
      .addCase(loadUserData.rejected, setError)
      .addCase(updateUser.fulfilled, setUpdatedData)
      .addCase(updateUser.rejected, setError)
      .addCase(signUp.fulfilled, setAuth)
      .addCase(signUp.rejected, setError)
      .addCase(signIn.fulfilled, setAuth)
      .addCase(signIn.rejected, setError)
      .addCase(logOut.fulfilled, clearUserData)
      .addCase(getUserHistoriesById.pending, setIsLoading)
      .addCase(getUserHistoriesById.fulfilled, setHistories)
      .addCase(getUserHistoriesById.rejected, setError);
  },
});

export const { setInitialState } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;

export const selectUser = () => (state: RootState) => state.user.userData;
export const selectUserFavorites = (state: RootState) =>
  state.user.userData?.favorites;
export const selectLoginStatus = () => (state: RootState) =>
  state.user.isLogged;
export const selectUserDataStatus = () => (state: RootState) =>
  state.user.dataIsLoaded;
export const selectUserIsLoading = () => (state: RootState) =>
  state.user.isLoading;

export type UserState = {
  userData: User | null;
  isLogged: boolean;
  dataIsLoaded: boolean;
  error: unknown;
  isLoading: boolean;
};

function setError(
  state: WritableDraft<UserState>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: PayloadAction<unknown, string, any, SerializedError>
) {
  state.error = action.payload;
  state.isLoading = false;
}

function setAuth(state: WritableDraft<UserState>) {
  state.isLogged = true;
}

function setIsLoading(state: WritableDraft<UserState>) {
  state.isLoading = true;
}

function setUserData(
  state: WritableDraft<UserState>,
  action: PayloadAction<User | null>
) {
  state.userData = action.payload;
  state.dataIsLoaded = true;
  state.isLoading = false;
}

function setUpdatedData(
  state: WritableDraft<UserState>,
  action: PayloadAction<Partial<User | null>>
) {
  if (action.payload) {
    state.userData = { ...state.userData, ...action.payload } as User;
  }
}

function clearUserData(state: WritableDraft<UserState>) {
  state.isLogged = false;
  state.userData = null;
}

function setHistories(
  state: WritableDraft<UserState>,
  action: PayloadAction<string[]>
) {
  if (state.userData) {
    state.userData.history = action.payload;
  }

  state.isLoading = false;
}
