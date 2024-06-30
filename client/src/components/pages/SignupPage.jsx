import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


const SignupPage = () => {

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: "yogesh11@gmail.com",
        username: "yogesh",
        password: "1234",
        confirmPassword: "1234"
    })

    const handleChange = function (e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async function (event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "credentials": 'include'
        }
        const body = {
            "email": formData.email,
            "username": formData.username,
            "password": formData.password
        }
        const res = await fetch("/api/user/create", {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        });
        const response = await res.json();

        if (response.success) {
            console.log(response);
            navigate("/user/login")
        } else {
            // console.log("message: ", response.message);
            // navigate("/user/login")
            setErrorMessage("User already exists!")
        }

    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
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
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {!passwordMatch && (
                            <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                        )}
                    </div>
                    <div className='h-[15px]'>
                        {errorMessage && (
                            <div className="text-red-500 text-sm">
                                {errorMessage}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
