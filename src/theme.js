export const customizations = () => ({
  palette: {
    primary: {
      main: '#181818',
      light: '#54545c',
      dark: '#191919',
    },
    secondary: {
      main: '#c8b5a7',
      light: '#d3c3b8',
      dark: '#8c7e74',
    },
  },
  typography: {
    fontFamily: 'Poppins, Dela Gothic One, cursive, sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
        inputProps: {
          style: {
            color: '#fff', // This sets the text field font color
          },
        },
      },
    },
  },
});
