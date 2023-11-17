import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext';
import { client } from './utils/apolloClient';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/verify/:token" element={<VerifyEmail />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
