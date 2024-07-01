import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch("/api/user/logout", { method: "POST" });
    const response = await res.json()
    console.log(response);
    navigate('/user/login'); // Redirect to login page after logout
  };

  const handleAbout = async () => {
    navigate('/app/user/about');
  };
  const handleHome = async () => {
    navigate('/app/user/home');
  };
  const handleContact = async () => {
    navigate('/app/user/contact');
  };




  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link onClick={handleHome} className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link onClick={handleAbout} className="px-3 py-2 rounded hover:bg-gray-700">
            About
          </Link>
          <Link onClick={handleContact} className="px-3 py-2 rounded hover:bg-gray-700">
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
