import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectuser } from '../../features/gameData/gameDataSlice';

/**
 * using rtk query
 * API Setup
 *  */

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers, { getState }) => {
      const user = selectuser(getState());
      if (user) {
        headers.set('Authorization', `Bearer ${user}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
