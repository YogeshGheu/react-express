import Footer from "../partials/FooterBar"
import Navbar from "../partials/NavigationBar"
// import { useLocation } from "react-router-dom"

import React, { useEffect, useState } from 'react'


const AboutUser = () => {
  // const location = useLocation();
  // const { userDetails } = location.state || {};
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    const getUserDetails = async function () {
      try {
        const res = await fetch("/api/app/get-user-details", { method: "POST" });
        const response = await res.json();
        if (!response.success) {
          return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
        }
        setUserDetails(response.user)
      } catch (error) {
        return console.log("error occured: ", error)
      } finally {
        setLoading(false);
      }
    }
    getUserDetails();
  }, [])


  if (loading) {
    return (
      <>
        <Navbar />
        <div className='flex justify-center max-h-[640px] min-h-[640px]'>
          <div>Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className='flex justify-center  max-h-[640px] min-h-[640px]'>
        {userDetails && (
          <div className="mx-auto h-fit bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Details</div>
                <h2 className="mt-2 text-2xl leading-8 font-bold tracking-tight text-gray-900">{userDetails.username.charAt(0).toUpperCase() + userDetails.username.slice(1)}</h2>
                <div className="mt-2">
                  <div className="text-gray-500">User ID: <span className="font-semibold">{userDetails._id}</span></div>
                  <div className="text-gray-500">Email: <span className="font-semibold">{userDetails.email}</span></div>
                  <div className="text-gray-500">Username: <span className="font-semibold">{userDetails.username}</span></div>
                  <div className="text-gray-500">Total Products: <span className="font-semibold">{userDetails.products.length}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default AboutUser

