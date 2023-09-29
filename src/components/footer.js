import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Footer Container
const FooterContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  background: 'transparent',
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
}));

const Footer = () => {
  // getting year
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Box>
        <Typography variant='body2' align='center' color='secondary'>
          &copy; {currentYear} Pro CHESS. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
