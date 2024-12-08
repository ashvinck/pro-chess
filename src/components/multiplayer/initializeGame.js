import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import connectToSocket from '../../config/socket';
import { selectUser } from '../../features/auth/authSlice';
import { savedSocket } from '../../features/multiplayer/socketSlice';

const InitializeSocket = () => {
  const [socket, setSocket] = useState(null);
  const user = useSelector(selectUser);
  const { displayName, userPic } = user;
  const dispatch = useDispatch();

  const initializeSocket = async () => {
    const { socket: newSocket } = connectToSocket(displayName, userPic);
    setSocket(newSocket); // Set the new socket instance to state
  };

  // Initialize socket on component mount and when user changes
  useEffect(() => {
    initializeSocket();
  }, [user]);

  // Dispatch savedSocket after the socket is initialized
  useEffect(() => {
    if (socket) {
      dispatch(savedSocket(socket));
    }
  }, [socket, dispatch]); // Run this effect whenever socket state changes

  return null; // No UI component to render
};

export default InitializeSocket;
