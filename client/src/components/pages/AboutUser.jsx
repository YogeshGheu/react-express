import Footer from "../partials/FooterBar"
import Navbar from "../partials/NavigationBar"
import { useLocation } from "react-router-dom"

import React from 'react'


const AboutUser = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};

  return (
    <>
      <Navbar />
      {userDetails && (
        <div className="mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Details</div>
              <h2 className="mt-2 text-2xl leading-8 font-bold tracking-tight text-gray-900">{userDetails.username.charAt(0).toUpperCase() + userDetails.username.slice(1)}</h2>
              <div className="mt-2">
                <div className="text-gray-500">User ID: <span className="font-semibold">{userDetails._id}</span></div>
                <div className="text-gray-500">Email: <span className="font-semibold">{userDetails.email}</span></div>
                <div className="text-gray-500">Username: <span className="font-semibold">{userDetails.username}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  )
}

export default AboutUser

