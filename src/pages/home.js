import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';

import Header from '../components/header';
import BackgroundImg from '../assets/chessbg.png';
import chessBoard from '../assets/chessboard.jpeg';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

// Container
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

// Home Component Wrapper
const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  flex: 1,
}));

// Home component
const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(3),
  borderRadius: '10px',
  padding: theme.spacing(6),
  background: 'rgba(47, 47, 47, 0.50)',
  backgroundRaius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5.5px)',
  WebkitBackdropFilter: 'blur(5.5px)',
  border: '1px solid rgba(47, 47, 47, 0.45)',
}));

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
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <StyledPaper elevation={2}>
          <StyledGrid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <ContentBox>
                <StyledHeading variant='h4'>
                  TAKE YOUR CHESS GAME TO THE NEXT LEVEL
                </StyledHeading>
                <StyledTypography variant='subtitle2'>
                  Connect with your friends and improve your skills to master
                  chess
                </StyledTypography>
                <Hidden mdDown>
                  <Link to='/play-game'>
                    <StyledButton
                      variant='contained'
                      color='secondary'
                      size='large'
                    >
                      Play Now
                    </StyledButton>
                  </Link>
                </Hidden>
              </ContentBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <ImageBox>
                <img
                  src={chessBoard}
                  alt='chessboard'
                  className='chessboard-img'
                />
              </ImageBox>
              <Box sx={{ textAlign: 'center' }}>
                <Hidden mdUp>
                  <StyledButton variant='contained' color='secondary'>
                    Play Now
                  </StyledButton>
                </Hidden>
              </Box>
            </Grid>
          </StyledGrid>
        </StyledPaper>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
};

export default Home;
