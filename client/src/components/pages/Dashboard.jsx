import React from 'react'
import Navbar from "../partials/NavigationBar"
import Footer from "../partials/FooterBar"

const Dashboard = () => {
  const lst = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // use effect to fetch all the products user has saved

  return (


    <div>
      <Navbar />

      <div className='flex flex-row flex-wrap max-h-[630px] min-h-[630px] overflow-scroll'>
        {lst.map((item) => {
          return (

            <div key={item} className="max-w-[222px] max-h-[400px] min-w-[222px] min-h-[400px] m-2 overflow-hidden rounded-xl shadow-lg bg-white">
              <div className='min-h-full flex flex-col justify-between'>
                <div className="">
                  <img
                    className="w-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmFY5RA0Ss-GoPLSzYANKGJ_PxTBiCrAbt5Q&s" // Replace with actual image URL
                    alt="Earphone"
                  />
                </div>
                <div>
                  <div className="px-6 py-2">
                    <div className="font-bold text-xl mb-1">Earphone</div>
                    <p className="text-gray-700 text-sm max-h-[50px] overflow-scroll">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      lorem ipsum dolar dit adas, fsskdjfk, fdsdiafsj elit.
                    </p>
                  </div>
                  <div className="px-6 py-2 flex items-center justify-between">
                    <span className="font-bold text-xl">$40.00</span>
                  </div>
                  <div>
                    <button className="w-full bg-gray-800 text-white font-bold py-2 hover:bg-gray-700">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

          )
        }
        )}
      </div>






      <Footer />
    </div>
  )
}

export default Dashboard
