import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apolloClient';

import Landing from './pages/Landing';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import Logout from './pages/Logout';
import AuthenticatedRoute from './utils/AuthenticatedRoute';

import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route element={<AuthenticatedRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
