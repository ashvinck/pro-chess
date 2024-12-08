import { GameEventEnum } from './constants';

const mountOnSocketStart = (socket) => {
  try {
    socket.on(GameEventEnum.CONNECTED_EVENT, (data) => {});
  } catch (error) {
    console.error('Erorr mounting socket', error);
  }
};

const unMountOnSocketStart = (socket) => {
  try {
    socket.off(GameEventEnum.CONNECTED_EVENT);
  } catch (error) {
    console.error('Erorr unmounting socket', error);
  }
};

const mountStartGame = (socket, roomData) => {
  try {
    socket.emit(GameEventEnum.CREATE_ROOM_EVENT, (data) => {
      roomData(data);
    });
  } catch (error) {
    console.error('Error in starting game', error);
  }
};

const mountOpponentJoinedGame = (socket, roomData, response) => {
  try {
    // Listen for the 'OPPONENT_JOINED_EVENT' from the server
    socket.emit(GameEventEnum.OPPONENT_JOINED_EVENT, roomData, (callback) => {
      // Check if there's an error in the response
      if (callback.error) {
        console.error('Error: ', callback.error);
        // Optionally display an error message to the user in the UI
        response(callback);
      } else {
        // Handle successful callback (no error)
        console.log('Opponent joined game:', callback);
        response(callback);
      }
    });
  } catch (error) {
    console.error('Error in joining user to game', error);
  }
};

const mountOnConfirmedOpponentJoinedGame = (socket, joinedUserData) => {
  try {
    socket.on(GameEventEnum.OPPONENT_JOINED_EVENT, (roomData) => {
      joinedUserData(roomData);
    });
  } catch (error) {
    console.error('Error in joined user', error);
  }
};

const unMountOnConfirmedOpponentJoinedGame = (socket) => {
  try {
    socket.off(GameEventEnum.OPPONENT_JOINED_EVENT);
  } catch (error) {
    console.error('Error in unmounting confirmed opponent joined game', error);
  }
};

const mountStartMutliplayerGame = (socket, gameData) => {
  try {
    socket.emit(GameEventEnum.GAME_START_EVENT, gameData);
  } catch (error) {
    console.error('Error in starting mutliplayer game', error);
  }
};

const mountOnConfirmStartMutliplayerGame = (socket, gameData) => {
  try {
    socket.on(GameEventEnum.GAME_START_EVENT, (roomData) => {
      gameData(roomData);
    });
  } catch (error) {
    console.error('Error in confirm start multiplayer game: ', error);
  }
};

const unMountOnConfirmStartMutliplayerGame = (socket) => {
  try {
    socket.off(GameEventEnum.GAME_START_EVENT);
  } catch (error) {
    console.error(
      'Error in unmount of confirm start multiplayer game: ',
      error
    );
  }
};

const mountMovePieces = (socket, gameData) => {
  try {
    socket.emit(GameEventEnum.MOVE_EVENT, gameData);
  } catch (error) {
    console.error('Error in moving pieces: ', error);
  }
};

const mountOnOpponentMovedPiece = (socket, gameData) => {
  try {
    socket.on(GameEventEnum.MOVE_EVENT, (data) => {
      console.log('Opponent moved piece', data);
      gameData(data);
    });
  } catch (error) {
    console.error('Error in moving piece: ', error);
  }
};

const unMountOnOpponentMovedPiece = (socket) => {
  try {
    socket.off(GameEventEnum.MOVE_EVENT);
  } catch (error) {
    console.error('Error in unmount Opponent moved piece: ', error);
  }
};

const mountSendFlashMessage = (socket, message) => {
  try {
    socket.emit(GameEventEnum.MESSAGE_EVENT, message);
  } catch (error) {
    console.error('Error in moving pieces: ', error);
  }
};

const mountOnFlashMessageReceived = (socket, message) => {
  try {
    socket.on(GameEventEnum.MESSAGE_EVENT, (data) => {
      console.log('Opponent sent message', data);
      message(data);
    });
  } catch (error) {
    console.error('Error in moving piece: ', error);
  }
};

const unMountOnFlashMessageReceived = (socket) => {
  try {
    socket.off(GameEventEnum.MESSAGE_EVENT);
  } catch (error) {
    console.error('Error in moving piece: ', error);
  }
};

const mountPlayerLeftEvent = (socket, roomId) => {
  try {
    socket.emit(GameEventEnum.DISCONNECT_EVENT, roomId);
    console.log('The player left is emitted');
  } catch (error) {
    console.error('error in mounting player left event: ', error.message);
  }
};

const mountCloseRoomEvent = (socket) => {
  try {
    socket.emit(GameEventEnum.CLOSE_ROOM_EVENT);
    console.log('Opponent left so room is closed');
  } catch (error) {
    console.error('Error in closing room event: ', error);
  }
};

// const unMountOnCloseRoomEvent = (socket, data) => {
//   try {
//     socket.off(GameEventEnum.CLOSE_ROOM_EVENT);
//   } catch (error) {
//     console.error('Error in closing room event: ', error);
//   }
// };

const mountAfterPlayerLeftEvent = (socket, data) => {
  try {
    socket.on(GameEventEnum.PLAYER_DISCONNECTED_EVENT, (playerData) => {
      console.log('The player left received', playerData);
      data(playerData);
    });
  } catch (error) {
    console.error('Error in player left event: ', error.message);
  }
};

const unMountAfterPlayerLeftEvent = (socket, data) => {
  try {
    socket.off(GameEventEnum.PLAYER_DISCONNECTED_EVENT);
  } catch (error) {
    console.error('Error in unmounting player left event: ', error.message);
  }
};

export {
  mountOnSocketStart,
  mountStartGame,
  mountOpponentJoinedGame,
  mountOnConfirmedOpponentJoinedGame,
  mountStartMutliplayerGame,
  mountOnConfirmStartMutliplayerGame,
  mountMovePieces,
  mountOnOpponentMovedPiece,
  mountSendFlashMessage,
  mountOnFlashMessageReceived,
  unMountOnSocketStart,
  unMountOnConfirmedOpponentJoinedGame,
  unMountOnConfirmStartMutliplayerGame,
  unMountOnOpponentMovedPiece,
  unMountOnFlashMessageReceived,
  mountCloseRoomEvent,
  // unMountOnCloseRoomEvent,
  mountAfterPlayerLeftEvent,
  unMountAfterPlayerLeftEvent,
  mountPlayerLeftEvent,
};
