import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from '../components/Dashboard/Navbar';
import Side from '../components/Dashboard/Sidebar';
import Addresses from '../components/Dashboard/Addresses';
import UserProfile from '../components/Dashboard/UserProfile';
import Settings from '../components/Dashboard/Settings';
import Header from '../components/common/Header';
import Auth from '../utils/auth'

// These are drilled down to the navbar and sidebar components. An "action" can be added to execute JS on click.
const navItems = [
  //{ name: 'Dashboard', path: '/dashboard' },
  { name: 'Addresses', path: '/dashboard/addresses' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Settings', path: '/dashboard/settings' },
];

const Dashboard = () => {

  
  return (
    <>
    <Header />
      <div className="flex flex-row lg:flex-row grow">

        {/* TODO: Clean this up, combine into one component */}
        <div className="lg:hidden">
          <Nav navItems={navItems} flip={true} />
        </div>
        <div className="lg:block hidden">
          <Side navItems={navItems} />
        </div>
        {/* ----------------------------------------------- */}
        
        <div className="w-full mt-12">
          <Routes>
            <Route index element={<Addresses />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;