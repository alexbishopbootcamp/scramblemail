import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ navItems, flip }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navbarRef = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      const newStyle = flip
        ? { bottom: isOpen ? 0 : -height }
        : { top: isOpen ? 0 : -height };

      setStyle(newStyle);
    }
  }, [isOpen, flip]); // Recalculate when isOpen or flip changes

  return (
    <nav ref={navbarRef} className={`flex text-white fixed w-full ${flip ? "flex-col-reverse bottom-0" : "flex-col top-0"}`}>
      <div className="px-4 py-3 w-full flex justify-between items-center fixed z-10 pointer-events-none">
        <div> {/* spacer */} </div>
        <button className="p-2 pointer-events-auto" onClick={() => setIsOpen(!isOpen)}>
          <div className="bg-white p-2 shadow-md rounded-full">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="#000000">
              <path fillRule="evenodd" d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
      {/* Menu Items */}
      <div className="relative px-2 pt-2 pb-4 bg-gradient-to-r from-theme-blue-200 to-theme-blue-300 transition-all" style={style}>
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} className="block px-2 py-1 text-white font-semibold rounded hover:text-theme-white-600">
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
