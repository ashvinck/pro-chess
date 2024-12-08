import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import GameContainer from '../components/gameContainer';
import InitializeSocket from '../components/multiplayer/initializeGame';

// Styled Dialog
const StyledDialog = React.memo(
  styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(2),
    backdropFilter: 'blur(5.5px)',
    background: 'rgba(47, 47, 47, 0.50)',
    '& .MuiPaper-root': {
      borderRadius: '10px',
      padding: theme.spacing(6),
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

// Box
const StyledBox = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  }))
);

// Start and Join Button
const StyledButton = React.memo(
  styled(Button)(({ theme }) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: theme.spacing(2),
    width: '150px',
  }))
);

const PlayWithAFriend = () => {
  const [dialogueOpen, setDialogueOpen] = useState(true);
  const navigate = useNavigate();

  // Start Game handler
  const handleStartGame = () => {
    console.log('Start game');

    setDialogueOpen(false);
    navigate('start-game');
  };
  // Join  Game handler
  const handleJoinGame = () => {
    console.log('Join game');
    setDialogueOpen(false);
    navigate('join-game');
  };

  return (
    <GameContainer>
      <InitializeSocket />
      <StyledDialog open={dialogueOpen}>
        <DialogActions>
          <StyledBox>
            <>
              <StyledButton
                variant='contained'
                color='secondary'
                onClick={handleStartGame}
              >
                Start a Game
              </StyledButton>
              <StyledButton
                variant='contained'
                color='secondary'
                onClick={handleJoinGame}
              >
                Join a Game
              </StyledButton>
            </>
          </StyledBox>
        </DialogActions>
      </StyledDialog>
    </GameContainer>
  );
};

export default PlayWithAFriend;
