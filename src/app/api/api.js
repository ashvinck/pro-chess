import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectUser } from '../../features/auth/authSlice';

/**
 * Adding user email to be sent in the header to identify the user
 *  */

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pro-chess-backend.vercel.app',
    prepareHeaders: (headers, { getState }) => {
      const user = selectUser(getState());
      const userEmail = user.email;
      if (userEmail) {
        headers.set('Authorization', `Bearer ${userEmail}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
