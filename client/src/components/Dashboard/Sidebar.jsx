import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ navItems }) => {


  return (
      <div className="flex flex-col gap-2 w-60 bg-azure h-full p-4">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}
            className="block px-2 py-1 text-white text-xl text-center font-bold hover:text-black"
            onClick={() => { item.action?.(); }}>
            {item.name}
          </Link>
        ))}
      </div>
  );
};

export default Navbar;
