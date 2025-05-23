import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaBoxOpen,
  FaShoppingCart,
  FaArrowCircleLeft,
  FaObjectGroup,
  FaBars,
  FaTimes
} from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Toggle button – shown on mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded "
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
      </button>

      <div
        className={`
          fixed md:fixed md:top-[10vh] top-0 left-0 h-full md:h-[90vh] bg-blue-600 text-white
          shadow-lg p-4
          transition-[width] duration-300 ease-in-out
          mt-20
          z-40
          ${collapsed ? 'w-16 overflow-hidden' : 'w-64'}
          md:w-64 md:relative md:top-[10vh] md:left-0 md:overflow-visible
        `}
      >
        <nav className="mt-6 flex flex-col gap-2">
          {[
            { to: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
            { to: '/dashboard/bookings', icon: <FaCalendarCheck />, label: 'Bookings' },
            { to: '/dashboard/products', icon: <FaBoxOpen />, label: 'Products' },
            { to: '/dashboard/add', icon: <FaShoppingCart />, label: 'Add Products' },
            { to: '/dashboard/order', icon: <FaObjectGroup />, label: 'Orders' },
            { to: '/', icon: <FaArrowCircleLeft />, label: 'Go Back' },
          ].map(({ to, icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  flex items-center gap-4 py-2 px-3 rounded
                  hover:bg-blue-700 transition-colors duration-200
                  ${active ? 'bg-blue-700 font-bold' : ''}
                `}
              >
                <span className="text-xl">{icon}</span>
                {!collapsed && <span className="text-base">{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
