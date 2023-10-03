import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Gameoptions from '../pages/gameOptions';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/play' element={<Gameoptions />} />
    </Routes>
  );
};

export default GameRoutes;
