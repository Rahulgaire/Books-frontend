import React from 'react';

const Footer = () => (
  <footer className="bg-[#333] border-t border-gray-700 text-white">
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
      
      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-semibold mb-6 md:mb-0">
        <li>
          <a href="/" className="hover:text-indigo-500 transition-colors duration-300">
            Home
          </a>
        </li>
        <li>
          <a href="/services" className="hover:text-indigo-500 transition-colors duration-300">
            Shop
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-indigo-500 transition-colors duration-300">
            About
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:text-indigo-500 transition-colors duration-300">
            Contact
          </a>
        </li>
      </ul>

      {/* Middle Section */}
      <div className="text-sm text-gray-400 mb-6 md:mb-0 max-w-xs">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        <p className="mt-2">
          <a href="#privacy" className="hover:text-indigo-500 transition-colors duration-300">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#terms" className="hover:text-indigo-500 transition-colors duration-300">
            Terms of Service
          </a>
        </p>
      </div>

      {/* Social Links */}
      <ul className="flex justify-center md:justify-start gap-6 text-indigo-400 text-2xl">
        <li>
          <a href="#" className="hover:text-indigo-600 transition-colors duration-300" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-indigo-600 transition-colors duration-300" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-indigo-600 transition-colors duration-300" aria-label="Twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
