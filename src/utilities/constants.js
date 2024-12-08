const GameEventEnum = Object.freeze({
  CONNECTED_EVENT: 'connected',
  DISCONNECT_EVENT: 'disconnected',
  CREATE_ROOM_EVENT: 'createRoom',
  OPPONENT_JOINED_EVENT: 'joinRoom',
  GAME_START_EVENT: 'gameStart',
  MOVE_EVENT: 'move',
  MESSAGE_EVENT: 'message',
  PLAYER_DISCONNECTED_EVENT: 'playerDisconnected',
  CLOSE_ROOM_EVENT: 'closeRoom',
  SOCKET_ERROR_EVENT: 'socketError',
});

const AvailableChatEvents = Object.values(GameEventEnum);

export { GameEventEnum, AvailableChatEvents };
