import { api } from '../../app/api/api';

export const gameApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    loadGameProgress: builder.query({
      query: () => '/play/computer/save',
      providedTags: ['gameData'],
      invalidatesTags: ['gameData'],
    }),
    saveGameProgress: builder.mutation({
      query: (gameData) => ({
        url: '/play/computer/save',
        method: 'POST',
        body: gameData,
      }),
      invalidatesTags: ['gameData'],
    }),
  }),
});

export const { useLoadGameProgressQuery, useSaveGameProgressMutation } =
  gameApiSlice;
