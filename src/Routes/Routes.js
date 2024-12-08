import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Gameoptions from '../pages/gameOptions';
import PlayWithComputer from '../pages/playWithComputer';
import PlayWithAFriend from '../pages/playWithAFriend';
import UserAuth from '../pages/userAuth';
import PrivateRoutes from './privateRoutes';
import StartGame from '../components/multiplayer/startGame';
import JoinGame from '../components/multiplayer/joinGame';
import MultiplayerGame from '../components/multiplayer/game.multiplayer';
import JoinAGame from '../pages/joinAGame';
import NotFound from '../pages/404NotFound';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/auth/user' element={<UserAuth />} />
      <Route path='/play' element={<PrivateRoutes />}>
        <Route index element={<Gameoptions />} />
        <Route path='computer' element={<PlayWithComputer />} />
        <Route path='friend' element={<PlayWithAFriend />} />
        <Route path='friend/start-game' element={<StartGame />} />
        <Route path='friend/join-game' element={<JoinGame />} />
        <Route path='friend/join-game/:roomId' element={<JoinAGame />} />
        <Route
          path='friend/game/start'
          element={<MultiplayerGame boardOrientation='white' />}
        />
        <Route
          path='friend/start/game'
          element={<MultiplayerGame boardOrientation='black' />}
        />
      </Route>
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate replace to='/404' />} />
    </Routes>
  );
};

export default GameRoutes;
