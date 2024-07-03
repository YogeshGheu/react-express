import Navbar from "../partials/NavigationBar";
import Footer from "../partials/FooterBar";

import React from 'react'

const ContactUser = () => {
  return (
    <>
      <Navbar />
      <div className='max-h-[630px] min-h-[630px] flex justify-center overflow-scroll'>
        <div className="shadow-xl h-fit p-16 rounded-xl">
          <h1>Name: Yogesh</h1>
          <h1>Phone: 9143876723</h1>
          <h1>Email: Yogeshgheu@gmail.com</h1>
          <h1>Address: Hisar</h1>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ContactUser
