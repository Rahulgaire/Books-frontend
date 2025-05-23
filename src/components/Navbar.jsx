import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartLength = useSelector((state) => state.product.products);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white  shadow-lg text-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-200">MyWebsite</Link>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-slate-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-x-3 space-x-6 items-center text-slate-800 font-bold">
          <li><Link to="/" className="hover:text-indigo-600  transition duration-200">Home</Link></li>
          <li><Link to="/about" className="hover:text-indigo-600 transition duration-200">About</Link></li>
          <li><Link to="/services" className="hover:text-indigo-600 transition duration-200">Services</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 transition duration-200">Contact</Link></li>
          <li><Link to="/login" className="hover:text-indigo-600 transition duration-200">Login</Link></li>
          <li>
            <Link to="/cart" className="flex items-center hover:text-indigo-600 transition duration-200">
              <FaCartShopping className="mr-1" />
              <sup>{cartLength.length}</sup>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white text-slate-800 shadow-inner">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-indigo-600 transition duration-200">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-indigo-600 transition duration-200">About</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block hover:text-indigo-600 transition duration-200">Services</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-indigo-600 transition duration-200">Contact</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-indigo-600 transition duration-200">Login</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-indigo-600 transition duration-200">
            <FaCartShopping className="mr-1" />
            <sup>{cartLength.length}</sup>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
