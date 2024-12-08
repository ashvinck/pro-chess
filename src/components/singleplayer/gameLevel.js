import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const GameLevel = ({ setGameHardnessLevel }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(2);

  const levels = [
    {
      label: 'Easy',
      depth: 2,
      icon: <SignalCellularAlt1BarIcon />,
    },
    {
      label: 'Medium',
      depth: 8,
      icon: <SignalCellularAlt2BarIcon />,
    },
    {
      label: 'Hard',
      depth: 18,
      icon: <SignalCellularAltIcon />,
    },
  ];

  const handleDepth = (depth) => {
    setSelectedLevel(depth);
    setGameHardnessLevel(depth);
    setOpen(false);
  };

  const actions = levels.map((level) => (
    <SpeedDialAction
      FabProps={{
        size: 'small',
        sx: {
          bgcolor: theme.palette.secondary.dark,
          '&:hover': {
            bgcolor: theme.palette.secondary.light,
          },
        },
      }}
      key={level.label}
      icon={level.icon}
      tooltipTitle={level.label}
      onClick={() => handleDepth(level.depth)}
    />
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <SpeedDial
        ariaLabel='SpeedDial for Game Levels'
        icon={<DoubleArrowIcon sx={{ color: theme.palette.primary.main }} />}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        direction='right'
        FabProps={{
          size: 'medium',
          sx: {
            bgcolor: theme.palette.secondary.dark,
            '&:hover': {
              bgcolor: theme.palette.secondary.light,
            },
          },
        }}
      >
        {actions}
      </SpeedDial>

      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            margin: theme.spacing(2),
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
        >
          Level: {levels.find((level) => level.depth === selectedLevel)?.label}
        </Button>
      </Box>
    </Box>
  );
};

export default GameLevel;
