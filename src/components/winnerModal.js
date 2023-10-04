import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

// Styled Dialog
const StyledDialog = styled(Dialog)(({ theme }) => ({
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
  },
}));

// Heading Text
const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingBottom: theme.spacing(2),
  fontFamily: 'Dela Gothic One, cursive ',
  marginBottom: theme.spacing(2),
}));

// Play Now Button
const StyledButton = styled(Button)(() => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
}));

const WinnerModal = ({ winner, handleClose, open }) => {
  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledHeading variant='h4'>{`${winner} wins ! 🎊🎉`}</StyledHeading>
      <StyledButton
        variant='contained'
        color='secondary'
        size='large'
        onClick={handleClose}
      >
        Play Again
      </StyledButton>
    </StyledDialog>
  );
};

export default WinnerModal;
