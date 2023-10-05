import React, { useEffect, useState } from 'react';

import GameContainer from '../components/gameContainer';
import SinglePlayerGame from '../components/game.singlePlayer';
import { useSelector } from 'react-redux';
import { selectuser } from '../features/gameData/gameDataSlice';
import UserInputModal from '../components/userInputModal';
import { useLoadGameProgressQuery } from '../features/gameData/gameApiSlice';
import SavedGameList from '../components/savedGameList';

const PlayWithComputer = () => {
  const user = useSelector(selectuser);

  const [showUserInputModal, setShowUserInputModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowUserInputModal(true);
    }
  }, [user]);

  const handleUserInputModalClose = () => {
    setShowUserInputModal(false);
  };
  return (
    <GameContainer>
      <SinglePlayerGame />
      {showUserInputModal && (
        <UserInputModal onClose={handleUserInputModalClose} />
      )}
    </GameContainer>
  );
};

export default PlayWithComputer;
