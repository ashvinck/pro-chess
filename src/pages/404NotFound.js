import React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image404 from '../assets/404.webp';
import Header from '../components/header';
import Footer from '../components/footer';

const PageContainer = styled(Box)(() => ({
  height: '100vh',
  width: '100%',
  background: `url(${Image404})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}));

// Heading Text
const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontFamily: 'Dela Gothic One, cursive',
  position: 'absolute',
  top: '15vh',
  left: '50%',
  transform: 'translateX(-50%)',
}));

const NotFound = () => {
  return (
    <PageContainer>
      <Header />
      <StyledHeading variant='h4'>Resource Not Found</StyledHeading>
      <Footer />
    </PageContainer>
  );
};

export default NotFound;
