import { createApi } from '@reduxjs/toolkit/query/react';
import { fakeServerQuery } from '../queries/fakeServerQuery';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeServerQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        method: 'signUp',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApi;