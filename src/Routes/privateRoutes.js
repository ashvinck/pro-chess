import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
  const userExists = useSelector(selectUser);
  // console.log('userExists', userExists);
  const location = useLocation();

  return userExists ? (
    <Outlet />
  ) : (
    <Navigate to='/auth/user' state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
