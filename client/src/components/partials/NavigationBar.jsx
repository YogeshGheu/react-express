import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Navbar = (props) => {


  // const [isLoggedIn, setIsLoggedIn] = useState(null)
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [reload, setReload] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserLoginStatus = async function () {
      try {
        const res = await fetch("/api/verify-login", { method: "POST" })
        const response = await res.json()
        setIsLoggedIn(response.success)
      } catch (error) {
        console.log("Error Occured! - ", error)
        setIsLoggedIn(false)
      }
    };
    checkUserLoginStatus()

  }, [])

  const handleHome = async () => {
    try {
      if (!isLoggedIn) {
        window.location.reload();
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

  const handleNavigation = async function (path) {
    try {
      const res = await fetch("/api/verify-login", { method: "POST" })
      const response = await res.json()
      if (response.success) {
        return navigate(path)
      } else {
        return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
      }
    } catch (error) {
      console.log("Error Occured! - ", error)
    }
  }

  const handleLoginLogout = async () => {
    if (!isLoggedIn) {
      return navigate("/user/login")
    }

    const res = await fetch("/api/user/logout", { method: "POST" });
    const response = await res.json()
    console.log(response);
    setIsLoggedIn(false)
    // navigate('/app/user/home'); // Redirect to login page after logout
    navigate('/'); // Redirect to login page after logout
  };


  return (

    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link onClick={handleHome} className="px-3 py-2 rounded hover:bg-gray-700">
            {props.homeText ? props.homeText : "Home"}
          </Link>

          {isLoggedIn && <Link onClick={() => { handleNavigation("/app/user/add-product") }} className="px-3 py-2 rounded hover:bg-gray-700">
            Add Product
          </Link>}

          {isLoggedIn && <Link onClick={() => { handleNavigation("/app/user/about") }} className="px-3 py-2 rounded hover:bg-gray-700">
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
