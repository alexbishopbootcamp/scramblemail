import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Auth from './auth';

const AuthenticatedRoute = ({ children, ...rest }) => {
  let navigate = useNavigate();

  return Auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthenticatedRoute;
