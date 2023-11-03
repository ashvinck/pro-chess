import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Gameoptions from '../pages/gameOptions';
import PlayWithComputer from '../pages/playWithComputer';
import PlayWithAFriend from '../pages/playWithAFriend';
import UserAuth from '../pages/userAuth';

const GameRoutes = ({ user }) => {
  // Adding a private route for preventing unauthorized access
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to='/auth/user' />;
  };

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth/user' element={<UserAuth />} />
      <Route
        path='/play'
        element={
          <PrivateRoute>
            <Gameoptions />
          </PrivateRoute>
        }
      />
      <Route
        path='/play/computer'
        element={
          <PrivateRoute>
            <PlayWithComputer />
          </PrivateRoute>
        }
      />
      <Route
        path='/play/friend'
        element={
          <PrivateRoute>
            <PlayWithAFriend />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default GameRoutes;
