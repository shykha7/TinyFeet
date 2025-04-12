import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Package, Users } from 'lucide-react';



function Sidenavbar() {

  const navigate = useNavigate()

  


  return (
    <div className="full-h-screen w-64 bg-amber-50 text-black flex flex-col justify-between shadow-lg">
     
      <div className="p-6">

        <nav className="flex flex-col space-y-4">
        <div className=" flex items-center space-x-2 font-serif text-2xl text-amber-600 font-bold italic tracking-wide hover:text-amber-800 cursor-pointer pl-4 mb-8">
          <span>TinyFeet</span>
        </div>


          <Link to="/dashboard" className="flex items-center space-x-3 hover:bg-amber-100 p-2 rounded-md transition-colors">
            <Home size={20} />
            <span className='text-black-300'>Dashboard</span>
          </Link>

          <Link to="/admin/products" className="flex items-center space-x-3 hover:bg-amber-100 p-2 rounded-md transition-colors">
            <Package size={20} />
            <span>Products</span>
          </Link>

          <Link to="/admin/users" className="flex items-center space-x-3 hover:bg-amber-100 p-2 rounded-md transition-colors">
            <Users size={20} />
            <span>Users</span>
          </Link>

          <Link to="/" className="flex items-center space-x-3 hover:bg-amber-100 p-2 rounded-md transition-colors">
            <span className='text-red-500 text-xl' onClick={()=>navigate('/')}>Back to Home</span>
          </Link>
        </nav>
      </div>

      
      <div className="p-4 text-sm text-gray-400">
        <p>&copy; 2025 TinyFeet</p>
      </div>
    </div>
  );
}

export default Sidenavbar;
