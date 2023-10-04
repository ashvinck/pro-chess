import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Styled Button
const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  margin: theme.spacing(2),
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const GameReset = ({ resetGame, undoMove }) => {
  return (
    <>
      <StyledButton variant='contained' onClick={resetGame}>
        Reset
      </StyledButton>
      <StyledButton variant='contained' onClick={undoMove}>
        Undo
      </StyledButton>
    </>
  );
};

export default GameReset;
