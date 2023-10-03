import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '10px',
  },
}));

const OptionsCard = ({ title, subtitle, to, icon }) => {
  return (
    <>
      <Link to={to}>
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={4}>
            <Box sx={{ m: 1 }}>
              <img src={icon} alt={title} />
            </Box>
          </StyledGrid>
          <StyledGrid item xs={8}>
            <Box sx={{ m: 1 }}>
              <StyledHeading variant='h5'>{title}</StyledHeading>
              <StyledTypography variant='subtitle2'>
                {subtitle}
              </StyledTypography>
            </Box>
          </StyledGrid>
        </StyledGrid>
      </Link>
    </>
  );
};

export default OptionsCard;
