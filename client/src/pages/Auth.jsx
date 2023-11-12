import React from 'react';
import Header from '../components/common/Header';
import Form from '../components/Auth/Form';
import Footer from '../components/common/Footer';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="flex grow justify-center items-center bg-theme-white-200">
        <Form type={location.pathname === '/signup' ? 'signup' : 'login'} />
      </div>
      <Footer />
    </>
  );
};


export default Auth;