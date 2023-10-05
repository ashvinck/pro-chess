import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/gameData/gameDataSlice';

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
    color: theme.palette.secondary.main,
  },
}));

// Play Now Button
const StyledButton = styled(Button)(() => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
}));

const UserInputModal = () => {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setUser(userName));
    setOpen(false);
  };

  return (
    <StyledDialog open={open}>
      <DialogTitle>Enter your username</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          color='secondary'
          id='username'
          label='Username'
          name='username'
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
          type='text'
          fullWidth
          variant='filled'
          focused
        />
      </DialogContent>
      <DialogActions>
        <StyledButton
          variant='contained'
          color='secondary'
          onClick={handleClose}
        >
          Save
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default UserInputModal;
