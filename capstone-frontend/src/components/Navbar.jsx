//  Navigation bar component - displays site header with cart info
//  Shows brand name, navigation links, and cart summary

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/CartStore';
import { useUserStore } from '../store/UserStore';
import { ShoppingCart, Upload } from 'lucide-react';
// import '../styles/navbar.css';


const Navbar = () => {
  // Get cart totals from store
  const { getTotalItems, getTotalPrice } = useCartStore();
  const { loggedIn, username, role, logout } = useUserStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }
  //const totalPrice = items?.reduce((total, item) => total + item.price, 0);
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">TechStore</h1>
        <div className="flex gap-6 items-center">
          {/* Home link with active state styling */}
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `hover:text-blue-200 transition-colors ${isActive ? 'font-bold' : ''}`
            }
          >
            Home
          </NavLink>
          {/* Cart link with item count and total price */}
          <NavLink 
            to="/upload" 
            className={({ isActive }) => 
              `flex items-center gap-2 hover:text-blue-200 transition-colors ${isActive ? 'font-bold' : ''}`
            }
          >
          {/* <Upload size={20} /> */}
          <span>Upload</span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `flex items-center gap-2 hover:text-blue-200 transition-colors ${isActive ? 'font-bold' : ''}`
            }
          >
          <ShoppingCart size={20} />
            {/* Full cart info on larger screens, count only on mobile */}
          <span className="hidden sm:inline">Cart ({getTotalItems()}) - ${getTotalPrice().toFixed(2)}</span>
          <span className="sm:hidden">({getTotalItems()})</span>
          </NavLink>
          {loggedIn && role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `hover:text-blue-200 transition-colors ${isActive ? 'font-bold' : ''}`
              }
            >
              Admin
            </NavLink>
          )}
          {loggedIn ? (
            <>
              <span className="text-blue-200">Hi, {username}</span>
          <button onClick={handleLogout} className="hover:text-white-200 transition-colors">
                Logout
          </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-blue-200 transition-colors ${isActive ? 'font-bold' : ''}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-blue-200 transition-colors ${isActive ? 'font-bold' : ''}`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


