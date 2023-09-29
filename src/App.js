import React from 'react';
import './App.css';
import {
  CssBaseline,
  Paper,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material';
import { customizations } from './theme';
import styled from '@emotion/styled';

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
        <div className='App'>
          <h1>Hello !</h1>
        </div>
      </StyledPaper>
    </ThemeProvider>
  );
}

export default App;
