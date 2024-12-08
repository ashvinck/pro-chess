import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,
  roomId: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    savedSocket: (state, action) => {
      state.socket = action.payload;
    },
    allottedRoomId: (state, action) => {
      state.roomId = action.payload;
      console.log(state.roomId);
    },
    logoutSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { savedSocket, allottedRoomId, logoutSocket } =
  socketSlice.actions;

export const selectSocket = (state) => state.socket.socket;
export const selectRoomId = (state) => state.socket.roomId;

export default socketSlice.reducer;
