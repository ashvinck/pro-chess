import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import gameProgressReducer from '../features/gameData/gameDataSlice';
import socketSliceReducer from '../features/multiplayer/socketSlice';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSliceReducer,
    game: gameProgressReducer,
    socket: socketSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
