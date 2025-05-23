import React from 'react';

const Footer = () => (
  <footer className="bg-[#333] border-t border-gray-200 text-white">
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      
      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm font-medium">
        <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
        <li><a href="/services" className="hover:text-indigo-600 transition">Shop</a></li>
        <li><a href="/about" className="hover:text-indigo-600 transition">About</a></li>
        <li><a href="/contact" className="hover:text-indigo-600 transition">Contact</a></li>
      </ul>

      {/* Middle Section */}
      <div className="text-sm text-gray-500">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        <p className="mt-1">
          <a href="#privacy" className="hover:text-indigo-600">Privacy Policy</a> |{' '}
          <a href="#terms" className="hover:text-indigo-600">Terms of Service</a>
        </p>
      </div>

      {/* Social Links */}
      <ul className="flex space-x-4 text-gray-600 gap-4">
        <li><a href="#" className="hover:text-indigo-600 text-xl"><i className="fa-brands fa-instagram"></i></a></li>
        <li><a href="#" className="hover:text-indigo-600 text-xl"><i className="fa-brands fa-facebook"></i></a></li>
        <li><a href="#" className="hover:text-indigo-600 text-xl"><i className="fa-brands fa-twitter"></i></a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
