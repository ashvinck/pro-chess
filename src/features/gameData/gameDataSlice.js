import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameData: [],
  gameProgress: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    savedGameProgress: (state, action) => {
      state.gameData = action.payload;
    },
    setGameProgress: (state, action) => {
      state.gameProgress = action.payload;
    },
  },
});

export const { savedGameProgress, setUser, setGameProgress } =
  gameSlice.actions;

// To retrieve game data anywhere in the app.
export const selectGameData = (state) => state.game.gameData;
// To retrieve game progress
export const selectGameProgress = (state) => state.game.gameProgress;
export default gameSlice.reducer;
