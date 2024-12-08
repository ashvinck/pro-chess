import React, { useEffect, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ToastContainer, toast } from 'react-toastify';
import { selectUser } from '../../features/auth/authSlice';
import {
  mountAfterPlayerLeftEvent,
  mountOnConfirmStartMutliplayerGame,
  mountOpponentJoinedGame,
  unMountOnConfirmStartMutliplayerGame,
} from '../../utilities/socket.io';
import {
  allottedRoomId,
  selectSocket,
} from '../../features/multiplayer/socketSlice';
import QuitGamePrompt from '../quitGamePrompt';

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

const StyledInputContainer = React.memo(
  styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.secondary.dark,
    borderRadius: '10px',
    padding: theme.spacing(2),
  }))
);

const StyledInputBase = React.memo(
  styled(InputBase)(({ theme }) => ({
    background: theme.palette.secondary.dark,
    fontFamily: 'sans-serif',
    paddingRight: theme.spacing(1),
    width: '210px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '& input': {
      textOverflow: 'ellipsis',
    },
  }))
);

const StyledImageBox = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

const JoinGame = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [enteredRoomId, setEnteredRoomId] = useState('');
  const [startGame, setStartGame] = useState(null);
  const [error, setError] = useState(null);
  const [playerLeft, setPlayerLeft] = useState(false);

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { displayName, userPic } = user;
  const socket = useSelector(selectSocket);

  useEffect(() => {
    if (socket) {
      mountOnConfirmStartMutliplayerGame(socket, (data) => {
        setStartGame(data.command);
        dispatch(allottedRoomId(data.roomId));
      });
      setLoading(false);

      return () => {
        unMountOnConfirmStartMutliplayerGame(socket);
      };
    }
    if (socket === null) {
      console.log('This is mounted', socket);
      navigate('/play');
    }
  }, [socket]);

  useEffect(() => {
    if (startGame === 'start-game') {
      navigate('/play/friend/start/game');
    }
  }, [startGame]);

  useEffect(() => {
    mountAfterPlayerLeftEvent(socket, (data) => {
      // dispatch(logoutSocket());
      setPlayerLeft(true);
      navigate('/play');
    });
  }, [socket]);

  const onRoomIdInputChanged = (e) => {
    setEnteredRoomId(e.target.value);
  };

  // Block navigating elsewhere when data has been entered into the input
  // let blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     currentLocation.pathname !== nextLocation.pathname
  // );
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const navigateToGamePlay =
      nextLocation.pathname === '/play/friend/start/game';
    if (navigateToGamePlay) {
      return false;
    }
    return true;
  });

  const onSubmitRoomId = () => {
    if (socket) {
      if (enteredRoomId.length !== 36) {
        console.error('Enter correct roomId');
        return toast.error('Please Enter the correct Room-Id');
      }
      const roomData = {
        socket: socket.id,
        roomId: enteredRoomId,
        displayName: displayName,
      };
      mountOpponentJoinedGame(socket, roomData, (callback) => {
        console.log('Callbacks: ' + callback);
        if (callback?.error) {
          setError(callback.error);
          toast.error(callback?.error);
        } else {
          setLoading(true);
        }
      });
    } else {
      return toast.error('Error connecting to server.');
    }
  };

  return (
    <>
      <ToastContainer theme='dark' />
      {blocker.state === 'blocked' ? (
        <QuitGamePrompt
          blocker={blocker}
          socket={socket}
          playerLeft={playerLeft}
        />
      ) : (
        <StyledDialog open={open}>
          {loading ? (
            <StyledLinkBox>
              <Typography sx={{ p: 2 }}>
                Waiting for player to start game
              </Typography>
              <CircularProgress color='secondary' />
            </StyledLinkBox>
          ) : (
            <>
              <DialogTitle textAlign='center'>
                Welcome {displayName}
              </DialogTitle>
              <DialogContent>
                <StyledImageBox>
                  <img
                    className='join-room-img'
                    src={userPic}
                    alt={displayName}
                  />
                </StyledImageBox>
                <Typography sx={{ textAlign: 'center', p: 2 }}>
                  Enter the shared Room Id
                </Typography>
                <StyledInputContainer>
                  <StyledInputBase
                    id='room-id'
                    label='RoomId'
                    name='RoomId'
                    value={enteredRoomId}
                    onChange={(e) => onRoomIdInputChanged(e)}
                  ></StyledInputBase>
                </StyledInputContainer>
                <StyledLinkBox>
                  <Fab
                    size='medium'
                    color='secondary'
                    sx={{
                      m: 2,
                    }}
                  >
                    <IconButton type='submit' onClick={onSubmitRoomId}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Fab>
                </StyledLinkBox>
              </DialogContent>
            </>
          )}
        </StyledDialog>
      )}
    </>
  );
};

export default JoinGame;
