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
    <header className="w-full flex items-center justify-between h-16 px-4">
      <img src="/logo-2.png" alt="Logo" width="200" />

      <nav className="flex-grow">
        <ul className="flex justify-center gap-5">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="flex gap-5">
        {authLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="px-4 py-2 rounded-lg bg-theme-blue-300 text-white">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
