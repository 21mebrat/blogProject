import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Redux Blog</h1>
        <nav>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/post"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Posts
              </Link>
            </li>
          </ul>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="space-y-4 p-4">
            <li>
              <Link
                to="/"
                className="block text-gray-300 hover:text-white transition duration-200"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/post"
                className="block text-gray-300 hover:text-white transition duration-200"
                onClick={toggleMenu}
              >
                Posts
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
