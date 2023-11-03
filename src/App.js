import React, { useEffect } from 'react';
import {
  CssBaseline,
  Paper,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import styled from '@emotion/styled';
import './App.css';
import { customizations } from './theme';
import GameRoutes from './Routes/Routes';
import { auth } from './utilities/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/auth/authSlice';

const StyledPaper = styled(Paper)(() => ({
  minHeight: '100vh',
  minWidth: '100vw',
  borderRadius: '0px',
}));

function App() {
  let theme = createTheme(customizations());
  theme = responsiveFontSizes(theme);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            displayName: authUser.displayName,
            email: authUser.email,
            userPic: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledPaper elevation={0}>
        <GameRoutes user={user} />
      </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
