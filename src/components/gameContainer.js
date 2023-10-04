import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './header';

const PageContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  background: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

const GameWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

const GameContainer = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <GameWrapper>{children}</GameWrapper>
    </PageContainer>
  );
};

export default GameContainer;
