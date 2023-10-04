import React from 'react';

import GameContainer from '../components/gameContainer';
import SinglePlayerGame from '../components/game.singlePlayer';

const PlayWithComputer = () => {
  return (
    <GameContainer>
      <SinglePlayerGame />
    </GameContainer>
  );
};

export default PlayWithComputer;
