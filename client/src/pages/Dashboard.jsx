import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from '../components/common/Nav';
import Addresses from '../components/Dashboard/Addresses';
import UserProfile from '../components/Dashboard/UserProfile';


const navItems = [
  //{ name: 'Dashboard', path: '/dashboard' },
  { name: 'Addresses', path: '/dashboard/addresses' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Settings', path: '/dashboard/settings' },
];

const Dashboard = () => {

  
  return (
    <div className="flex flex-col-reverse max-h-screen overflow-scroll md:flex-row grow w-full h-full">

      <Nav navItems={navItems} flip={true} />

        <Routes>
          <Route index element={<Addresses />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* <Route path="/settings" element={<Settings />} /> */}

        </Routes>

    </div>
  );
};

export default Dashboard;