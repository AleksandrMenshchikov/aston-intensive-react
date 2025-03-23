import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API, X_RAPIDAPI_KEY } from '../../constants';
import { IFilmsRequest, IFilmsResponse } from '../../types/interfaces';

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  endpoints: (builder) => ({
    getRandomFilms: builder.query<IFilmsResponse, void>({
      query: () => ({
        url: '/titles/random?list=top_rated_series_250',
        headers: {
          'x-rapidapi-key': X_RAPIDAPI_KEY,
        },
      }),
    }),
    getFilms: builder.query<IFilmsResponse, IFilmsRequest>({
      query: ({ title, page }) => ({
        url: `/titles/search/title/${title}?exact=false${page && `&page=${page}`}`,
        headers: {
          'x-rapidapi-key': X_RAPIDAPI_KEY,
        },
      }),
    }),
  }),
});

export const { useGetRandomFilmsQuery, useLazyGetFilmsQuery } = filmApi;
