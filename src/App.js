import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { auth } from './config/firebase';
import { login, logout } from './features/auth/authSlice';
import { logoutSocket } from './features/multiplayer/socketSlice';
import { Outlet } from 'react-router-dom';

const StyledPaper = React.memo(
  styled(Paper)(() => ({
    minHeight: '100vh',
    minWidth: '100vw',
    borderRadius: '0px',
  }))
);

function App() {
  let theme = createTheme(customizations());
  theme = responsiveFontSizes(theme);

  const dispatch = useDispatch();

  useEffect(() => {
    // Set up an observer to listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // The user is authenticated, dispatch the user information to the store
        dispatch(
          login({
            displayName: authUser.displayName,
            email: authUser.email,
            userPic: authUser.photoURL,
          })
        );
      } else {
        // The user is not authenticated, dispatch logout and socket off action
        dispatch(logout());
        dispatch(logoutSocket());
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledPaper elevation={0}>
        <Outlet />
      </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
