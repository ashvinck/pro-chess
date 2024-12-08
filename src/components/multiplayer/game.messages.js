import React, { useState } from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import DOMPurify from 'dompurify';
import { mountSendFlashMessage } from '../../utilities/socket.io';

const StyledInputContainer = React.memo(
  styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.secondary.dark,
    borderRadius: '10px',
    padding: theme.spacing(2),
    width: '100%',
  }))
);

const StyledInputBase = React.memo(
  styled(InputBase)(({ theme }) => ({
    background: theme.palette.secondary.dark,
    fontFamily: 'sans-serif',
    paddingRight: theme.spacing(1),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '& input': {
      textOverflow: 'ellipsis',
    },
    width: '100%',
  }))
);

const StyledBox = React.memo(
  styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  }))
);

const StyledIconButton = React.memo(
  styled(IconButton)(({ theme }) => ({
    background: theme.palette.secondary.dark,
    padding: theme.spacing(2.5),
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: theme.palette.secondary.light,
    },
  }))
);

const Messages = ({ socket, roomId }) => {
  const [message, setMessage] = useState('');

  const limit = process.env.REACT_APP_MAX_MESSAGE_LENGTH;

  const sanitizeMessage = (message) => {
    // Remove potentially harmful HTML or scripts
    return DOMPurify.sanitize(message, { ALLOWED_TAGS: [], ALLOWED_ATTR: {} });
  };

  const handleInputChange = (event) => {
    const inputMessage = event.target.value;
    if (inputMessage.length <= limit) {
      setMessage(inputMessage);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onClickSend();
    }
  };

  const onClickSend = () => {
    const sanitizedMessage = sanitizeMessage(message);
    const messageData = {
      message: sanitizedMessage,
      roomId: roomId,
    };
    mountSendFlashMessage(socket, messageData);
    console.log('Send message', messageData);
    setMessage('');
  };

  return (
    <StyledBox>
      <StyledBox>
        <Grid2 container spacing={1}>
          <Grid2 size={11}>
            <StyledInputContainer>
              <StyledInputBase
                placeholder='Type your flash message'
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></StyledInputBase>
            </StyledInputContainer>
          </Grid2>
          <Grid2 size={1}>
            <StyledIconButton onClick={onClickSend}>
              <SendIcon />
            </StyledIconButton>
          </Grid2>
        </Grid2>
      </StyledBox>
    </StyledBox>
  );
};

export default Messages;
