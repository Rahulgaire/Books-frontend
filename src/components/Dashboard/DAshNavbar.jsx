import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, X } from 'lucide-react';

function DashNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    toast("Logout successful");
    navigate("/");
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-gradient-to-r from-blue-900 to-blue-700 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">Logo</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-semibold text-lg">
          <Link to="/dashboard/" className="hover:text-blue-300 transition-colors no-underline">
            Dashboard
          </Link>
          <Link to="/dashboard/order" className="hover:text-blue-300 transition-colors no-underline">
            Orders
          </Link>
        </div>

        {/* Logout Button (Desktop) */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="bg-black hover:bg-gray-800 px-5 py-2 rounded-md font-semibold text-sm transition-all"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="focus:outline-none">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full  bg-blue-900 z-50 flex flex-col pt-20 px-6
          transform transition-transform duration-300 ease-in-out w-full
          text-white
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <Link
          to="/dashboard/"
          onClick={() => setMenuOpen(false)}
          className="py-3 text-lg font-semibold hover:text-blue-300 border-b border-blue-800 no-underline"
        >
          Dashboard
        </Link>
        <Link
          to="/dashboard/order"
          onClick={() => setMenuOpen(false)}
          className="py-3 text-lg font-semibold hover:text-blue-300 border-b border-blue-800 no-underline"
        >
          Orders
        </Link>
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="mt-6 bg-black hover:bg-gray-800 px-4 py-2 rounded font-semibold text-sm w-1/2"
        >
          Logout
        </button>
      </aside>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

export default DashNavbar;
