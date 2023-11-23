import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Auth from '../utils/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Auth.logout();

    // Give the user some time to read the message before redirecting to the home page
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 3500); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
    <Header />
    <div className="flex grow justify-center items-center bg-theme-white-200">
      <div className="flex flex-col text-2xl gap-y-8 px-6 py-8 bg-theme-white-100 shadow-lg rounded-lg
                      items-center">
        <span className="text-md text-theme-blue-400">Logged out successfully</span>

      </div>
    </div>
    </>
  );
};

export default Logout;
