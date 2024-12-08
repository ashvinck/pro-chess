import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectUser } from '../../features/auth/authSlice';
import { API } from '../../config/API';

/**
 * Adding user email to be sent in the header to identify the user
 *  */

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://pro-chess-backend.vercel.app',
    baseUrl: API,
    prepareHeaders: (headers, { getState }) => {
      const user = selectUser(getState());
      const userEmail = user.email;
      const userName = user.displayName;
      if (userEmail) {
        headers.set('Authorization', `Bearer ${userEmail} ${userName}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
