import axios from 'axios';
import { LogOut } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContextCreate } from '../App';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 To get current route

  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const userId = localStorage.getItem('id');
  const { conCart } = useContext(ContextCreate);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://db-d0r9.onrender.com/users/${userId}`)
        .then((response) => {
          setUsername(response.data.name);
          setIsAdmin(response.data.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('id');
    window.location.reload();
    navigate('/');
  };

  // 🔥 Hide search bar on product detail page or any other route
  const hideSearchOnRoutes = ['/navigate'];
  const shouldShowSearch = !hideSearchOnRoutes.some(path => location.pathname.startsWith(path));

  return (
    <nav className="flex items-center justify-between p-4 br border-b border-gray-200  z-50 top-0">
      {/* Left: Logo */}
      <div
        className="font-serif text-4xl text-amber-600 font-bold italic tracking-wide hover:text-amber-800 cursor-pointer"
        onClick={() => navigate('/')}
      >
        TinyFeet
      </div>

      {/* Center: Conditional Search Bar */}
      {shouldShowSearch && (
        <div className="flex items-center w-full justify-center">
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none px-4 py-2 border border-amber-300 rounded-xl w-full md:w-64"
          />
        </div>
      )}

      {/* Right: Icons and User */}
      <div className="flex items-center space-x-5 ml-auto">
        <i
          className="fas fa-clipboard-check text-amber-600 hover:text-amber-800 cursor-pointer"
          onClick={() => navigate('/orderhistory')}
        />

        <div
          className="relative text-amber-600 hover:text-amber-800 cursor-pointer"
          onClick={() => navigate('/cart')}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1.5 py-0.5">
            {conCart}
          </span>
        </div>

        <div className="text-amber-600 hover:text-amber-800 cursor-pointer flex items-center">
          {username}
          {username ? (
            <button>
              <LogOut onClick={handleLogout} className="h-5 w-5 ml-2 hover:text-amber-400" />
            </button>
          ) : (
            <i className="fas fa-user text-xl ml-2" onClick={() => navigate('/login')}></i>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
