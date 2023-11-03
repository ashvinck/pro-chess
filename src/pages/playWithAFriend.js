import React from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import Template from '../components/template';

// Heading Text
const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingBottom: theme.spacing(2),
  fontFamily: 'Dela Gothic One, cursive ',
}));

const PlayWithAFriend = () => {
  return (
    <Template>
      <StyledHeading variant='h4'>Feature coming soon </StyledHeading>
    </Template>
  );
};

export default PlayWithAFriend;
