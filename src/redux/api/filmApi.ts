import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API, X_RAPIDAPI_KEY } from '../../constants';
import { IRandomFilmsResponse } from '../../types/interfaces';

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: (builder) => ({
    getRandomFilms: builder.query<IRandomFilmsResponse, void>({
      query: () => ({
        url: '/titles/random?list=top_rated_series_250',
        headers: {
          'x-rapidapi-key': X_RAPIDAPI_KEY,
        },
      }),
    }),
  }),
});

export const { useGetRandomFilmsQuery } = filmApi;
