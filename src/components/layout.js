import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Chess from '../pages/chess';

const Layout = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/play-game' element={<Chess />} />
    </Routes>
  );
};

export default Layout;
