import React from 'react'
import Navbar from '../partials/NavigationBar'
import Footer from '../partials/FooterBar'
import { useState } from 'react'

const PublicDashboard = () => {

    const [showProductContainer, setShowProductContainer] = useState(false)
    const [emailOrShopName, setEmailOrShopName] = useState("")
    const [products, setProducts] = useState([])

    const handleChange = function (e) {
        setEmailOrShopName(e.target.value)
    }

    const findProducts = async function () {
        const body = {
            "emailOrShopName":emailOrShopName
        }
        const res = await fetch("/api/public-user/get-products", {
            method:"POST",
            body:JSON.stringify(body),
            headers:{'Content-Type': 'application/json'}
        })
        const response = await res.json()
        console.log(response)
    }

    return (
        <>
            <Navbar />
            <div className='flex flex-row flex-wrap max-h-[640px] min-h-[640px] overflow-scroll'>
                {!showProductContainer ? <div className='flex items-start justify-center min-h-full min-w-full'>
                    <div className='mt-5 flex items-center justify-center gap-3'>
                        <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
                            Email/Shop Name
                        </label>
                        <input
                            type="text"
                            name="usernameOrEmail"
                            id="usernameOrEmail"
                            value={emailOrShopName}
                            onChange={handleChange}
                            required
                            className=" px-3 py-2 mt-1 border border-gray-300 rounded-md"
                        />

                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={findProducts}
                        >
                            Find Products
                        </button>
                    </div>
                </div> :
                    (
                        products.map((product) => {
                            return (

                                <div key={product._id} className="max-w-[222px] max-h-[400px] min-w-[222px] min-h-[400px] m-2 overflow-hidden rounded-xl shadow-lg bg-white">
                                    <div className='min-h-full flex flex-col justify-between'>
                                        <div className="">
                                            <img
                                                className="w-full"
                                                src={`http://localhost:3000${product.productImage}`}

                                                alt="product image"
                                            />
                                        </div>
                                        <div>
                                            <div className="px-6 py-2">
                                                <div className="font-bold text-xl mb-1">{product.productName}</div>
                                                <p className="text-gray-700 text-sm max-h-[50px] overflow-scroll">
                                                    {product.productDescription}
                                                </p>
                                            </div>
                                            <div className="px-6 py-2 flex items-center justify-between">
                                                <span className="font-bold text-xl">INR{" " + product.productPrice}</span>
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
                        )
                    )
                }
            </div>
            <Footer />
        </>

    )
}

export default PublicDashboard
