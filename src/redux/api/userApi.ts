import { createApi } from '@reduxjs/toolkit/query/react';
import { fakeServerQuery } from '../queries/fakeServerQuery';
import { setUserAuth } from '../slices/userSlice';
import handleError from '../../utils/handleError';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeServerQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        methodName: 'signUp',
        methodArgs: credentials,
      }),
      // onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setUserAuth(data));
      //   } catch (error) {
      //     handleError(error);
      //   }
      // },
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        methodName: 'singInWithPassword',
        methodArgs: credentials,
      }),
      // onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setUserAuth(data));
      //   } catch (error) {
      //     handleError(error);
      //   }
      // },
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        methodName: 'updateUser',
        methodArgs: payload,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserAuth(data));
        } catch (error) {
          handleError(error);
        }
      },
    }),
    getUserById: builder.query({
      query: (userId) => ({
        methodName: 'getUserById',
        methodArgs: userId,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = userApi;
