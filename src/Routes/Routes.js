import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Gameoptions from '../pages/gameOptions';
import PlayWithComputer from '../pages/playWithComputer';
import PlayWithAFriend from '../pages/playWithAFriend';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/play' element={<Gameoptions />} />
      <Route path='/play/computer' element={<PlayWithComputer />} />
      <Route path='/play/friend' element={<PlayWithAFriend />} />
    </Routes>
  );
};

export default GameRoutes;
