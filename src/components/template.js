import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Header from './header';
import BackgroundImg from '../assets/chessbg.webp';
import Footer from './footer';

// Container (background image)
const PageContainer = styled(Box)(() => ({
  height: '100vh',
  width: '100%',
  background: `url(${BackgroundImg})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
}));

// Component Wrapper
const ContentWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  flex: 1,
}));

// Blurred Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  borderRadius: '10px',
  padding: theme.spacing(6),
  background: 'rgba(47, 47, 47, 0.50)',
  backgroundRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5.5px)',
  WebkitBackdropFilter: 'blur(5.5px)',
  border: '1px solid rgba(47, 47, 47, 0.45)',
}));

const Template = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <StyledPaper elevation={2}>{children}</StyledPaper>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Template;
