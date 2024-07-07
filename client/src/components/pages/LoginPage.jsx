import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"

const LoginPage = (props) => {



  const [formData, setFormData] = useState({
    usernameOrEmail: 'yogesh11@gmail.com',
    password: '1234',
  });
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();



  const location = useLocation();
  const { error } = location.state || "";

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      navigate('.', { state: { error: '' } });
    }
  }, [error, navigate]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };
    const body = {
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    };
    const res = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });
    const response = await res.json();

    if (!response.success) {
      setErrorMessage("Invalid Credentials!")
      return navigate('/user/login');
    }
    console.log('User logged in');
    navigate('/app/user/home');

    //provide a sign up button below the login button which will redirect to signup page

  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              name="usernameOrEmail"
              id="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className='h-[15px]'>
            {errorMessage && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            {!errorMessage && error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => { navigate("/user/create") }}
              className="w-full mt-3 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
