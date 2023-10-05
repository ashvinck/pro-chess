import { configureStore } from '@reduxjs/toolkit';
import gameProgressReducer from '../features/gameData/gameDataSlice';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    game: gameProgressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
