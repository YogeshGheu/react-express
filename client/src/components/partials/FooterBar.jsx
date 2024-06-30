import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 min-w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          
          <Link to="/privacy" className="px-3 py-2 rounded hover:bg-gray-700">
            Privacy Policy
          </Link>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
