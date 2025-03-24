import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import generateUniqId from '../../utils/generateUniqId';
import { GlobalState } from '../../types/state';
import userService from '../../services/user.service';
import authService, { AuthPayload } from '../../services/auth.service';
import tokenService from '../../services/token.service';

const isAuthed = true; // Затычка
function getUserId() {
  return generateUniqId();
} // Затычка

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

export function loadUserData(id: string) {
  //TODO аргумент здесь не уместен, в последствии нужно реализовать, чтобы "сервер" получал auth при запросах.
  return async function dispatchRequest(dispatch: Dispatch) {
    dispatch(userLoadRequested());
    try {
      const user = await userService.getUserInfo(id);
      if (user) dispatch(userLoadSucceed(user));
    } catch (err) {
      userLoadFailed(err);
    }
  };
}

export function signUp(payload: AuthPayload) {
  return async function (dispatch: Dispatch) {
    dispatch(authRequested());
    try {
      const userId = await authService.signUp(payload);
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
export function logOut() {
  return (dispatch: Dispatch) => {
    try {
      dispatch(userLoggedOut());
      tokenService.removeAuth();
    } catch (err) {
      dispatch(userLogoutFailed(err));
    }
  };
}
export function getUser() {
  return function findUser({ user }: GlobalState): User | null {
    return user.userData;
  };
}
export function getLoginStatus() {
  return (s: GlobalState): boolean => s.user.isLogged;
}
export function getUserDataStatus() {
  return (s: GlobalState): boolean => s.user.dataIsLoaded;
}

function initState() {
  if (isAuthed) {
    return {
      auth: getUserId(),
      userData: null,
      isLogged: true,
      dataIsLoaded: false,
      error: null,
    };
  } else {
    return {
      auth: null,
      userData: null,
      isLogged: false,
      dataIsLoaded: false,
      error: null,
    };
  }
}

export default userReducer;

export type UserState = {
  userData: User | null;
  isLogged: boolean;
  dataIsLoaded: boolean;
  error: unknown;
};

type ErrorMessage = { message: string };
