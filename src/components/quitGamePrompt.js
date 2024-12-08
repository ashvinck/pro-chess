import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  logoutSocket,
  selectRoomId,
} from '../features/multiplayer/socketSlice';
import { mountPlayerLeftEvent } from '../utilities/socket.io';
import { useNavigate } from 'react-router-dom';

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

const StyledBoxContainer = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

const QuitGamePrompt = ({ blocker, socket, playerLeft }) => {
  const [open, setOpen] = useState(true);
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnProceed = () => {
    blocker.proceed();
    mountPlayerLeftEvent(socket, roomId);
    dispatch(logoutSocket());
    navigate('/play');
  };

  const handleOnPlayerLeft = () => {
    blocker.proceed();
    navigate('/play');
  };

  return (
    <StyledDialog open={open}>
      {playerLeft === true ? (
        <>
          <DialogTitle>Opponent left the room. Restart a new game.</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <StyledButton
                variant='contained'
                color='secondary'
                onClick={handleOnPlayerLeft}
              >
                Proceed
              </StyledButton>
            </Box>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>
            Are you sure you want to quit? Any progress will be lost!
          </DialogTitle>
          <DialogContent>
            <StyledBoxContainer>
              <StyledButton
                variant='contained'
                color='secondary'
                onClick={handleOnProceed}
              >
                Proceed
              </StyledButton>
              <StyledButton
                variant='contained'
                color='secondary'
                onClick={() => blocker.reset()}
              >
                Cancel
              </StyledButton>
            </StyledBoxContainer>
          </DialogContent>
        </>
      )}
    </StyledDialog>
  );
};

export default QuitGamePrompt;
