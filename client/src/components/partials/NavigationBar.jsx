import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    const res = await fetch("/api/user/logout", {method:"POST"});
    const response = await res.json()


    console.log(response);
    navigate('/user/login'); // Redirect to login page after logout

  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link to="/about" className="px-3 py-2 rounded hover:bg-gray-700">
            About
          </Link>
          <Link to="/contact" className="px-3 py-2 rounded hover:bg-gray-700">
            Contact
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
