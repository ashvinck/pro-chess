import React from 'react';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from '../assets/logo.svg';

// Container for header
const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
  color: theme.palette.secondary.main,
  fontWeight: 'bold',
}));

// Logo Box
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginX: '10px',
}));

// Header Links
const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  fontSize: '15px',
  marginRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
}));

const Header = () => {
  return (
    <AppBar position='static' color='transparent'>
      <Container maxWidth='xxl'>
        <Toolbar disableGutters>
          <BoxContainer>
            <StyledBox>
              <img src={Logo} alt='logo' height='60' width='60' />
              <span>Pro CHESS</span>
            </StyledBox>
            <StyledBox>
              <StyledButton color='secondary' size='large'>
                Login
              </StyledButton>
              <StyledButton color='secondary' size='large'>
                Signup
              </StyledButton>
            </StyledBox>
          </BoxContainer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
