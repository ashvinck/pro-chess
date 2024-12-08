import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBlocker, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import { selectUser } from '../../features/auth/authSlice';
import ChessAvatar from '../../assets/chess-avatar.svg';
import {
  mountOnConfirmedOpponentJoinedGame,
  mountOnSocketStart,
  mountStartGame,
  mountStartMutliplayerGame,
  unMountOnConfirmedOpponentJoinedGame,
  unMountOnSocketStart,
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
    justifyContent: 'space-between',
  }))
);

const StyledImageBoxTitle = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }))
);

const StyledNameTypography = React.memo(
  styled(Typography)(({ theme }) => ({
    fontFamily: 'Dela Gothic One',
    color: theme.palette.secondary.dark,
    textAlign: 'center',
    fontSize: '12px',
    maxWidth: '90px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }))
);

const StyledTypography = React.memo(
  styled(Typography)(({ theme }) => ({
    fontFamily: 'Dela Gothic One',
    color: theme.palette.secondary.dark,
    textAlign: 'center',
  }))
);

const StyledLinkBox = React.memo(
  styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }))
);

const StyledButton = React.memo(
  styled(Button)(({ theme }) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: theme.spacing(2),
    width: '150px',
  }))
);

const StartGame = () => {
  // const [socket, setSocket] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [joinedUserData, setJoinedUserData] = useState(null);
  const [open, setOpen] = useState(true);
  const [textCopied, setTextCopied] = useState(false);
  const user = useSelector(selectUser);
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayName, userPic } = user;

  const roomId = roomData?.roomId;
  let roomUrl;
  if (roomId) {
    roomUrl =
      window.location.href.replace('start-game', 'join-game') + '/' + roomId;
  }

  const opponentPic = joinedUserData?.userPic;
  const opponentName = joinedUserData?.displayName;

  // Block navigating elsewhere when data has been entered into the input
  // let blocker = useBlocker(
  //   ({ currentLocation, nextLocation }) =>
  //     currentLocation.pathname !== nextLocation.pathname
  // );
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    console.log('currentLocation', currentLocation.pathname);
    console.log('nextLocation', nextLocation.pathname);
    const navigateToGamePlay =
      nextLocation.pathname === '/play/friend/game/start';
    if (navigateToGamePlay) {
      return false;
    }
    return true;
  });

  const shareRoom = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Play Pro Chess with me.',
          text: `Join my chess room!\nRoom code: ${roomId}\nURL: ${roomUrl}`,
          url: roomUrl,
        });
      } else {
        // Fallback for browsers that do not support Web Share API
        console.log('Web Share API not supported.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setTextCopied(true);

    setTimeout(() => {
      setTextCopied(false);
    }, 5000);
  };

  const handleJoinGame = () => {
    try {
      if (!roomId || !socket) {
        throw new Error('Invalid room or socket.');
      }
      mountStartMutliplayerGame(socket, roomId);
      dispatch(allottedRoomId(roomId));
      navigate('/play/friend/game/start');
    } catch (error) {
      console.error('Error while starting game:', error);
    }
  };

  useEffect(() => {
    if (socket) {
      mountOnSocketStart(socket);
      mountStartGame(socket, (data) => {
        setRoomData(data);
      });
      mountOnConfirmedOpponentJoinedGame(socket, (data) => {
        setJoinedUserData(data);
      });

      return () => {
        unMountOnSocketStart(socket);
        unMountOnConfirmedOpponentJoinedGame(socket);
      };
    }
    if (socket === null) {
      console.log('socket is null');
      navigate('/play');
    }
  }, [socket, navigate]);

  return (
    <>
      {blocker.state === 'blocked' ? (
        <QuitGamePrompt blocker={blocker} socket={socket} playerLeft={false} />
      ) : (
        <StyledDialog open={open}>
          <DialogTitle textAlign='center'>
            Invite a Friend to join room
          </DialogTitle>
          <DialogContent>
            <StyledImageBox>
              <StyledImageBoxTitle>
                <img
                  className='join-room-img'
                  src={userPic}
                  alt={displayName}
                />
                <StyledNameTypography>{displayName}</StyledNameTypography>
              </StyledImageBoxTitle>
              <Fab size='small' color='primary'>
                <StyledTypography>Vs</StyledTypography>
              </Fab>
              <StyledImageBoxTitle>
                <img
                  className='join-room-img'
                  src={opponentPic ? opponentPic : ChessAvatar}
                  // src={ChessAvatar}
                  alt='opponent'
                />
                <StyledNameTypography>
                  {opponentName ? opponentName : 'Waiting..'}
                </StyledNameTypography>
              </StyledImageBoxTitle>
            </StyledImageBox>

            <StyledLinkBox>
              {opponentPic ? (
                <StyledButton
                  variant='contained'
                  color='secondary'
                  onClick={handleJoinGame}
                >
                  Start Game
                </StyledButton>
              ) : (
                <>
                  <Typography sx={{ textAlign: 'center', p: 2 }}>
                    Copy the Room Id
                  </Typography>
                  <StyledInputContainer>
                    <StyledInputBase
                      value={roomId}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <IconButton onClick={copyRoomId}>
                      {textCopied ? <DoneIcon /> : <ContentCopyIcon />}
                    </IconButton>
                  </StyledInputContainer>
                  <Fab size='small' color='primary' sx={{ m: 2 }}>
                    <StyledTypography>OR</StyledTypography>
                  </Fab>
                  <Typography sx={{ textAlign: 'center', p: 2 }}>
                    Share the url link
                  </Typography>
                  <StyledInputContainer>
                    <StyledInputBase
                      value={roomUrl}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <IconButton onClick={shareRoom}>
                      <ShareIcon />
                    </IconButton>
                  </StyledInputContainer>
                </>
              )}
            </StyledLinkBox>
          </DialogContent>
        </StyledDialog>
      )}
    </>
  );
};

export default StartGame;
