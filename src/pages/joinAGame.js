import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';
import { selectUser } from '../features/auth/authSlice';
import {
  allottedRoomId,
  selectSocket,
} from '../features/multiplayer/socketSlice';
import {
  mountOnConfirmStartMutliplayerGame,
  mountOpponentJoinedGame,
  unMountOnConfirmStartMutliplayerGame,
} from '../utilities/socket.io';
import InitializeSocket from '../components/multiplayer/initializeGame';

// Styled Dialog
const StyledDialog = React.memo(
  styled(Dialog)(({ theme }) => ({
    backdropFilter: 'blur(5.5px)',
    background: 'rgba(47, 47, 47, 0.50)',
    '& .MuiPaper-root': {
      borderRadius: '10px',
      padding: theme.spacing(2),
      background: 'rgba(47, 47, 47, 0.50)',
      backgroundRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5.5px)',
      WebkitBackdropFilter: 'blur(5.5px)',
      border: '1px solid rgba(47, 47, 47, 0.45)',
      color: theme.palette.secondary.main,
    },
  }))
);

const StyledLinkBox = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }))
);

const JoinAGame = () => {
  const { roomId } = useParams();
  const user = useSelector(selectUser);
  const socket = useSelector(selectSocket); // Get socket from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { displayName } = user;
  const [startGame, setStartGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!socket) {
      // toast.error('Error connecting to server');
      return;
    }
    if (!roomId) {
      toast.error('Room ID is missing');
      return;
    }

    if (roomId.length !== 36) {
      toast.error('Incorrect Room-Id');
      return;
    }

    const roomData = {
      socket: socket.id,
      roomId,
      displayName,
    };

    mountOpponentJoinedGame(socket, roomData, (callback) => {
      console.log('Callbacks: ' + callback);
      if (callback?.error) {
        setError(callback.error);
        toast.error(callback?.error);
      }
    });
  }, [socket, roomId, displayName]);

  const handleStartGame = useCallback(
    (data) => {
      setStartGame(data.command);
      dispatch(allottedRoomId(data.roomId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (socket) {
      mountOnConfirmStartMutliplayerGame(socket, handleStartGame);
    }
    return () => {
      socket && socket.off(unMountOnConfirmStartMutliplayerGame);
    };
  }, [socket, handleStartGame]);

  useEffect(() => {
    if (startGame === 'start-game') {
      navigate('/play/friend/start/game');
    }
  }, [startGame, navigate]);

  return (
    <>
      <ToastContainer theme='dark' />
      {error ? (
        <StyledDialog open={true}>
          <StyledLinkBox>
            <Typography sx={{ p: 2 }}>{error}</Typography>
            <CircularProgress color='secondary' />
          </StyledLinkBox>
        </StyledDialog>
      ) : (
        <StyledDialog open={true}>
          <StyledLinkBox>
            <Typography sx={{ p: 2 }}>
              Waiting for player to start game
            </Typography>
            <CircularProgress color='secondary' />
          </StyledLinkBox>
        </StyledDialog>
      )}
      <InitializeSocket />
    </>
  );
};

export default JoinAGame;
