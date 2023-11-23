import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from '../components/common/Navbar';
import Addresses from '../components/Dashboard/Addresses';
import UserProfile from '../components/Dashboard/UserProfile';


const navItems = [
  //{ name: 'Dashboard', path: '/dashboard' },
  { name: 'Addresses', path: '/dashboard/addresses' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Settings', path: '/dashboard/settings' },
  { name: 'Logout', path: '/logout' },
];

const Dashboard = () => {

  
  return (
    <div className="flex flex-row max-h-screen overflow-scroll grow w-full h-full">

      <div>
        <Nav navItems={navItems} flip={true} />
      </div>
        <div className="w-full">
          <Routes>
            <Route index element={<Addresses />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/settings" element={<Settings />} /> */}

        </Routes>
        </div>
    </div>
  );
};

export default Dashboard;