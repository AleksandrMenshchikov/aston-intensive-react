import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { User, UserId } from '../../types/User';
import userService from '../../services/user.service';
import authService, { AuthPayload } from '../../services/auth.service';
import tokenService from '../../services/token.service';
import { RootState } from '../store';
import { userApi } from '../api/userApi';

const initialState = initState();
const sliceConfig = {
  name: 'user',
  initialState,
  reducers: {
    authRequested() {},
    authRequestSucceed(state: UserState, action: PayloadAction<string>) {
      state.isLogged = Boolean(action.payload);
    },
    authRequestFailed(state: UserState, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    userLoadRequested() {},
    userLoadSucceed(state: UserState, action: PayloadAction<User>) {
      state.userData = action.payload;
      state.dataIsLoaded = Boolean(action.payload);
    },
    userLoadFailed(state: UserState, action: PayloadAction<unknown>) {
      const { message } = action.payload as ErrorMessage;
      state.error = message;
    },
    userLoggedOut(state: UserState) {
      state.dataIsLoaded = false;
      state.error = null;
      state.isLogged = false;
      state.userData = null;
    },
    userLogoutFailed(state: UserState, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
  },
};

const userSlice = createSlice(sliceConfig);
const { reducer: userReducer, actions } = userSlice;
const {
  authRequested,
  authRequestSucceed,
  authRequestFailed,
  userLoadRequested,
  userLoadSucceed,
  userLoadFailed,
  userLoggedOut,
  userLogoutFailed,
} = actions;

export function loadUserData() {
  return async function fetchUserData(dispatch: Dispatch) {
    dispatch(userLoadRequested());
    const userId = tokenService.getAuth();
    if (userId) {
      try {
        const user = await userService.getUserInfo(userId);
        if (user) dispatch(userLoadSucceed(user));
      } catch (err) {
        userLoadFailed(err);
      }
    }
  };
}

export function signUp(payload: AuthPayload) {
  return async function (dispatch: Dispatch) {
    dispatch(authRequested());
    try {
      const userId = await dispatch(userApi.endpoints.signUp.initiate(payload)).unwrap();
      if (userId) {
        tokenService.setAuth(userId);
        dispatch(authRequestSucceed(userId));

        return true;
      }
    } catch (err) {
      dispatch(authRequestFailed(err));
      return false;
    }
  };
}
export function signIn(payload: AuthPayload) {
  return async function dispatchLogin(dispatch: Dispatch) {
    dispatch(authRequested());
    try {
      const userId = await authService.signInWithPassword(payload);
      tokenService.setAuth(userId);
      dispatch(authRequestSucceed(userId));

      return true;
    } catch (err) {
      authRequestFailed(err);
      return false;
    }
  };
}
export function setUserAuth(payload: UserId) {
  return async function (dispatch: Dispatch) {
    dispatch(authRequested());
    dispatch(authRequestSucceed(payload));
    tokenService.setAuth(payload);
  };
}
export function logOut() {
  return (dispatch: Dispatch) => {
    try {
      dispatch(userLoggedOut());
      tokenService.clearAuth();
    } catch (err) {
      dispatch(userLogoutFailed(err));
    }
  };
}
export function getUser() {
  return function findUser({ user }: RootState): User | null {
    return user.userData;
  };
}
export function getLoginStatus() {
  return (s: RootState): boolean => s.user.isLogged;
}
export function getUserDataStatus() {
  return (s: RootState): boolean => s.user.dataIsLoaded;
}

function initState() {
  return {
    userData: null,
    isLogged: Boolean(tokenService.getAuth()),
    dataIsLoaded: false,
    error: null,
  };
}

export default userReducer;

export type UserState = {
  userData: User | null;
  isLogged: boolean;
  dataIsLoaded: boolean;
  error: unknown;
};

type ErrorMessage = { message: string };
