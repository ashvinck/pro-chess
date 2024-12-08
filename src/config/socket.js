import { io } from 'socket.io-client';
import { API } from './API';

const connectToSocket = (userName, userPic) => {
  try {
    const socket = io(API, {
      auth: {
        displayName: `${userName}`,
        userPic: `${userPic || ''} `,
      },
    });

    return { socket };
  } catch (error) {
    console.error('Error in connecting to socket', error);
  }
};

export default connectToSocket;
