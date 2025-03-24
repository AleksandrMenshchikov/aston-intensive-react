import { configureStore } from '@reduxjs/toolkit';
import { filmApi } from './api/filmApi';
import userReducer from './slices/userSlice';
import { userApi } from './api/userApi';

export const store = configureStore({
  reducer: {
    [filmApi.reducerPath]: filmApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([filmApi.middleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
