import React from 'react';
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

function App() {
  let theme = createTheme(customizations());
  theme = responsiveFontSizes(theme);

  const StyledPaper = styled(Paper)(() => ({
    minHeight: '100vh',
    minWidth: '100vw',
    borderRadius: '0px',
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledPaper elevation={0}>
        <GameRoutes />
      </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
