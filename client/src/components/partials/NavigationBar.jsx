import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = (props) => {

  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const navigate = useNavigate();



  useEffect(() => {
    const checkUserLoginStatus = async function () {
      try {
        const res = await fetch("/api/verify-login", { method: "POST" })
        const response = await res.json()
        if (response.success) {
          return setIsLoggedIn(true)

        } else {
          return setIsLoggedIn(false)
        }
      } catch (error) {
        console.log("Error Occured! - ", error)
      }
    };

    checkUserLoginStatus()

  }, [])


  const handleLoginLogout = async () => {
    if(!isLoggedIn){
      return navigate("/user/login")
    }

    const res = await fetch("/api/user/logout", { method: "POST" });
    const response = await res.json()
    console.log(response);
    setIsLoggedIn(false)
    // navigate('/app/user/home'); // Redirect to login page after logout
    navigate('/'); // Redirect to login page after logout
  };

  const handleAbout = async () => {
    try {
      const res = await fetch("/api/verify-login", { method: "POST" })
      const response = await res.json()
      if (response.success) {
        return navigate('/app/user/about');
      } else {
        return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
      }
    } catch (error) {
      console.log("Error Occured! - ", error)
    }
  };

  const handleHome = async () => {
    try {
      if(!isLoggedIn){
        return navigate("/")
      }
      const res = await fetch("/api/verify-login", { method: "POST" })
      const response = await res.json()
      if (response.success) {
        return navigate('/app/user/home');
      } else {
        return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
      }
    } catch (error) {
      console.log("Error Occured! - ", error)
    }
  };

  const handleContact = async () => {

    try {
      const res = await fetch("/api/verify-login", { method: "POST" })
      const response = await res.json()
      if (response.success) {
        return navigate('/app/user/contact');
      } else {
        return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
      }
    } catch (error) {
      console.log("Error Occured! - ", error)
    }
  };

  const handleAddProduct = async () => {
    try {
      const res = await fetch("/api/verify-login", { method: "POST" })
      const response = await res.json()
      if (response.success) {
        return navigate("/app/user/add-product")
      } else {
        return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
      }
    } catch (error) {
      console.log("Error Occured! - ", error)
    }
  }


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link onClick={handleHome} className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          {isLoggedIn && <Link onClick={handleAddProduct} className="px-3 py-2 rounded hover:bg-gray-700">
            Add Product
          </Link>}

          {/* <Link onClick={handleContact} className="px-3 py-2 rounded hover:bg-gray-700">
            Contact
          </Link> */}
          {isLoggedIn && <Link onClick={handleAbout} className="px-3 py-2 rounded hover:bg-gray-700">
            About
          </Link>}

        </div>

        {isLoggedIn ? <button
          onClick={handleLoginLogout}
          className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
        >
          Logout
        </button> : <button
          onClick={handleLoginLogout}
          className="px-3 py-2 rounded bg-green-600 hover:bg-green-700"
        >
          Login
        </button>}

      </div>
    </nav>
  );
};

export default Navbar;
