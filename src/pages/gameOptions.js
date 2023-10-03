import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OptionsCard from '../components/optionsCard';
import Template from '../components/template';
import ComputerImg from '../assets/computer..svg';
import PlayImg from '../assets/playwhite.svg';

const Options = [
  {
    title: 'Play Computer',
    subtitle: 'Available in Three difficulty levels',
    icon: ComputerImg,
    to: '/play/computer',
  },
  {
    title: 'Play with Friends',
    subtitle: 'Invite a friend and play with them.',
    icon: PlayImg,
    to: 'play/friend',
  },
];

const BoxWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const Gameoptions = () => {
  return (
    <Template>
      <BoxWrapper>
        {Options.map(({ title, subtitle, icon, to }) => (
          <OptionsCard
            key={title}
            title={title}
            subtitle={subtitle}
            icon={icon}
            to={to}
          />
        ))}
      </BoxWrapper>
    </Template>
  );
};

export default Gameoptions;
