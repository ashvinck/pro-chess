import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const userExists = useSelector(selectUser);
  console.log('userExists', userExists);

  return userExists ? <Outlet /> : <Navigate to='/auth/user' />;
};

export default PrivateRoutes;
