import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Logo from '../assets/logo.svg';
import { logout, selectUser } from '../features/auth/authSlice';
import { LogoutOutlined } from '@mui/icons-material';
import { auth } from '../utilities/firebase';

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

// Styled Typography
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

// Styled Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '10px',
  background: 'rgba(47, 47, 47, 0.50)',
  backgroundRadius: '19px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5.5px)',
  WebkitBackdropFilter: 'blur(5.5px)',
  border: '1px solid rgba(47, 47, 47, 0.45)',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));
// For logout Container
const StyledLogoutPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '3px solid rgba(47, 47, 47, 0.45)',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
  },
}));
// For Logout container Typography
const StyledLogoutTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  paddingLeft: theme.spacing(1),
}));

const Header = () => {
  const user = useSelector(selectUser);

  /**
   * Popover
   */
  const [anchorEl, setAnchorEl] = useState(null);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  // Logout handler function
  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <AppBar position='static' color='transparent'>
      <Container maxWidth='xxl'>
        <Toolbar disableGutters>
          <BoxContainer>
            <StyledBox>
              <img src={Logo} alt='logo' height='60' width='60' />
              <span>Pro CHESS</span>
            </StyledBox>
            {user ? (
              <StyledBox>
                {/* -------- DisplayName and Avatar -------- */}
                <StyledPaper>
                  <StyledTypography>Ashvin C K</StyledTypography>
                  <Avatar
                    alt='user'
                    src={user.userPic}
                    sx={{ borderRadius: '10px', cursor: 'pointer' }}
                    onClick={handleAvatarClick}
                  />
                </StyledPaper>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    m: 1,
                  }}
                >
                  {/* ----- Popover contents ----- */}
                  <StyledLogoutPaper onClick={handleLogout}>
                    <LogoutOutlined color='secondary' />
                    <StyledLogoutTypography>Logout</StyledLogoutTypography>
                  </StyledLogoutPaper>
                </Popover>
              </StyledBox>
            ) : null}
          </BoxContainer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
