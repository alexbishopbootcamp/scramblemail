import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Auth from './auth';

// Wrapper for Routes that require authentication. Just redirects to the login page if not authenticated.
const AuthenticatedRoute = ({ children, ...rest }) => {
  let navigate = useNavigate();

  return Auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthenticatedRoute;
