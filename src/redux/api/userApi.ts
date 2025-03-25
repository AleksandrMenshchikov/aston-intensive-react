import { createApi } from '@reduxjs/toolkit/query/react';
import { fakeServerQuery } from '../queries/fakeServerQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeServerQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        methodName: 'signUp',
        methodArgs: credentials,
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        methodName: 'singInWithPassword',
        methodArgs: credentials,
      }),
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        methodName: 'updateUser',
        methodArgs: payload,
      }),
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

export type AuthPayload = { email: string; password: string };
