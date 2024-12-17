import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import chessBoard from '../assets/chessboard.webp';
import Template from '../components/template';
import { API } from '../config/API';

// Grid Container
const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

// Box for text
const ContentBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-evenly',
  height: '100%',
}));

// Heading Text
const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingBottom: theme.spacing(2),
  fontFamily: 'Dela Gothic One, cursive ',
}));

// Sub Title Text
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingBottom: theme.spacing(2),
  fontFamily: 'Poppins, sans-serif',
}));

// Play Now Button
const StyledButton = styled(Button)(() => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
}));

// Chess Image
const ImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const Home = () => {
  /**
   * This is a workaround for render deployment ( API servers no application purpose)
   * Render spools up really slow from cold start
   * So, I am calling the home api when user clicks this button cause this makes sure that
   * server is up and running by the time auth is completed by the user.
   */
  const handleCallHomeApi = async () => {
    try {
      const response = await fetch(`${API}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Handle the fetched data if needed
      // For example, updating state or redirecting the user based on response
    } catch (error) {
      console.error('Error calling home API:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <Template>
      <StyledGrid container spacing={2}>
        <Grid size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
          <ContentBox>
            <StyledHeading variant='h4'>
              TAKE YOUR CHESS GAME TO THE NEXT LEVEL
            </StyledHeading>
            <StyledTypography variant='subtitle2'>
              Enhance Your Chess Mastery: Challenge Stockfish, the Renowned
              Chess Engine!
            </StyledTypography>
            <Hidden mdDown>
              <Link to='/play'>
                <StyledButton
                  variant='contained'
                  color='secondary'
                  size='large'
                  onClick={handleCallHomeApi}
                >
                  Play Now
                </StyledButton>
              </Link>
            </Hidden>
          </ContentBox>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6, xl: 6 }}>
          <ImageBox>
            <img src={chessBoard} alt='chessboard' className='chessboard-img' />
          </ImageBox>
          <Box sx={{ textAlign: 'center' }}>
            <Hidden mdUp>
              <Link to='/play'>
                <StyledButton variant='contained' color='secondary'>
                  Play Now
                </StyledButton>
              </Link>
            </Hidden>
          </Box>
        </Grid>
      </StyledGrid>
    </Template>
  );
};

export default Home;
