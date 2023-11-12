import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', text: 'Home' },
  { to: '/about', text: 'About' },
  { to: '/contact', text: 'Contact' },
];

const authLinks = [
  { to: '/signup', text: 'Sign Up' },
  { to: '/login', text: 'Log In' },
];



const Header = () => {
  return (
    <header className="w-full flex flex-row h-16 items-center justify-between gap-5 px-4">
      <img src="logo-2.png" width="332" height="37"></img>
      <nav>
        <ul className="flex flex-row gap-5 flex-grow">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="flex flex-row gap-5 flex-grow">
        {authLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.text}</Link>
          </li>
        ))}
      </ul>
    
    </header>
  );
};

export default Header;