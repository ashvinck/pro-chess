import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

const GameLevel = ({ gameHardnessLevel, setGameHardnessLevel }) => {
  const theme = useTheme();

  // Styled Box
  const StyledBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
  }));

  // game level
  const levels = {
    Easy: 2,
    Medium: 8,
    Hard: 18,
  };

  const handleDepth = (depth) => {
    setGameHardnessLevel(depth);
  };

  return (
    <StyledBox>
      {Object.entries(levels).map(([level, depth]) => (
        <Button
          key={level}
          variant='contained'
          onClick={() => handleDepth(depth)}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            margin: theme.spacing(2),
            backgroundColor:
              depth === gameHardnessLevel
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark,
            color: theme.palette.primary.main,
          }}
        >
          {level}
        </Button>
      ))}
    </StyledBox>
  );
};

export default GameLevel;
