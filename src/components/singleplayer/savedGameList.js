import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RestoreIcon from '@mui/icons-material/Restore';
import Dialog from '@mui/material/Dialog';
import {
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Pagination,
  IconButton,
  DialogActions,
} from '@mui/material';
import { useLoadGameProgressQuery } from '../../features/gameData/gameApiSlice';
import { setGameProgress } from '../../features/gameData/gameDataSlice';

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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '10px',
  },
}));
const StyledButton = styled(Button)(() => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
}));
const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontFamily: 'Poppins, sans-serif',
}));

const SavedGameList = () => {
  // Fetching data from api
  const { data, isSuccess, isError } = useLoadGameProgressQuery();

  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(data);

  // Function to handle the restore button click
  const handleIconClick = (fen) => {
    dispatch(setGameProgress(fen));
    // console.log(fen);
  };

  // Pagination
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <StyledDialog open={open} onClose={handleClose}>
        {isSuccess && (
          <DialogContent>
            <StyledHeading variant='h5'>Saved Games</StyledHeading>
            <List>
              {data.slice(startIndex, endIndex).map((game, index) => (
                <StyledListItem key={index}>
                  <StyledListItemText
                    primary={`Game ${index + startIndex + 1}`}
                  />
                  <IconButton
                    onClick={() => handleIconClick(game.fen)}
                    color='secondary'
                  >
                    <RestoreIcon />
                  </IconButton>
                </StyledListItem>
              ))}
            </List>
            {data.length > itemsPerPage && (
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </DialogContent>
        )}
        {isError && (
          <DialogContent>
            <StyledHeading variant='h6'>
              Cannot retrieve data at the moment
            </StyledHeading>
          </DialogContent>
        )}
        <DialogActions>
          <StyledButton
            variant='contained'
            color='secondary'
            onClick={handleClose}
          >
            Close
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default SavedGameList;
