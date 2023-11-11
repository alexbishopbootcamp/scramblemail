import React from 'react';
import Splash from '../components/Landing/Splash';
import Info from '../components/Landing/Info';
import Header from '../components/Landing/Header';

const Landing = () => {
  return (
    <div>
      <Header />
      <Splash />
      <Info />
    </div>
  );
};

export default Landing;