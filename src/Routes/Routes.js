import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Gameoptions from '../pages/gameOptions';
import PlayWithComputer from '../pages/playWithComputer';
import PlayWithAFriend from '../pages/playWithAFriend';
import UserAuth from '../pages/userAuth';
import PrivateRoutes from './privateRoutes';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth/user' element={<UserAuth />} />
      <Route path='/play' element={<PrivateRoutes />}>
        <Route index element={<Gameoptions />} />
        <Route path='computer' element={<PlayWithComputer />} />
        <Route path='friend' element={<PlayWithAFriend />} />
      </Route>
    </Routes>
  );
};

export default GameRoutes;
