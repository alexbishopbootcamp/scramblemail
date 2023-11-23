import React from 'react';
import { Link } from 'react-router-dom';

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
    <header className="w-full flex items-center justify-between h-16 px-4 shadow-md z-10">
      <img src="/logo-2.png" alt="Logo" className="w-32 md:w-52" />

      <nav className="flex-grow hidden md:block">
        <ul className="flex justify-center gap-5">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="flex gap-2 md:gap-5">
        {authLinks.map((link, index) => (
          <li key={index} className="hover:scale-105 transition-transform">
            <Link to={link.to} className="px-2 md:px-4 py-2 rounded-lg bg-azure text-white">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
