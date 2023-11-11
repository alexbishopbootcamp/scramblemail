import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-row h-14 items-center justify-between gap-5 px-4">
      <img src="logo-2.png" width="332" height="37"></img>
      <nav>
        <ul className="flex flex-row gap-5 flex-grow">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <h1>Sign In / Log In</h1>
    </header>
  );
};

export default Header;