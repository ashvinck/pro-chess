import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ReplayIcon from '@mui/icons-material/Replay';
import UndoIcon from '@mui/icons-material/Undo';
import Tooltip from '@mui/material/Tooltip';

// Styled IconButton
const StyledIconButton = styled(IconButton)(({ theme }) => ({
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
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Tooltip title='Reset'>
        <StyledIconButton variant='contained' onClick={resetGame}>
          <ReplayIcon />
        </StyledIconButton>
      </Tooltip>
      <Tooltip title='Undo'>
        <StyledIconButton variant='contained' onClick={undoMove}>
          <UndoIcon />
        </StyledIconButton>
      </Tooltip>
    </Box>
  );
};

export default GameReset;
