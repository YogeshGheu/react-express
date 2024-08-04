import React, { useEffect } from 'react'
import Navbar from '../partials/NavigationBar'
import Footer from '../partials/FooterBar'
import { useState } from 'react'

const PublicDashboard = () => {

    const [showProductContainer, setShowProductContainer] = useState(false)
    // const [emailOrShopName, setEmailOrShopName] = useState("")
    const [productName, setProductName] = useState("")
    const [products, setProducts] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [shops, setShops] = useState([
        { name: "yogesh", itemCount: 20 }
    ])


    const handleChange = function (e) {
        setProductName(e.target.value)
    }

    const findProducts = async function (shopName) {
        const body = {
            "emailOrShopName": shopName
        }
        try {
            const res = await fetch("/api/public-user/get-products", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await res.json()
            if (!response.success) {
                setErrorMessage(response.message)
                return setShowProductContainer(false);
            }

            const finalProductsList = []
            await response.products.forEach(product => {
                // console.log(product.product) //.product and .seller
                const eachProductInfo = {...product.product, "seller":product.seller}
                finalProductsList.push(eachProductInfo)
            });

            // console.log("this is final list " ,finalProductsList)
            setProducts(finalProductsList)
            setShowProductContainer(true);
        } catch (error) {
            console.log("Something went wrong - ", error)
        }
    }

    const handleShopClick = function (e) {
        findProducts(e.target.innerHTML)
    }


    const findAProduct = async function (productName) {
        const body = {
            "productName": productName
        }
        try {
            const res = await fetch("/api/public-user/get-a-product", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
            const response = await res.json() 

            if (!response.success) {
                setErrorMessage(response.message)
                return setShowProductContainer(false);
            }

            const finalProductsList = []
            
            await response.products.forEach(product => {
                // console.log(product.product) //.product and .seller
                const eachProductInfo = {...product.product, "seller":product.seller}
                finalProductsList.push(eachProductInfo)
            });

            // console.log("this is final list " ,finalProductsList)
            setProducts(finalProductsList)
            setShowProductContainer(true);

        } catch (error) {
            console.log("Something went wrong - ", error) 
        }
    }

    useEffect(() => {
        const findShops = async function () {
            try {
                const res = await fetch("/api/public-user/get-shops", {
                    method: "GET",
                })
                const response = await res.json()
                if (!response.success) {
                    setErrorMessage(response.message)
                    return setShops([{ "name": "error occured", itemCount: "not found" }])
                }
                setShops(response.shops)
            } catch (error) {
                console.log("Something went wrong - ", error)
                return setShops([{ "name": "error occured", itemCount: "not found" }])

            }
        }
        findShops()
    }, [])

    return (
        <>
            {!showProductContainer? <Navbar /> : <Navbar homeText="Back to Home" />}
            <div className='flex flex-row flex-wrap max-h-[640px] min-h-[calc(100vh-140px)] overflow-scroll'>
                {!showProductContainer ?
                    <div className=' flex-colflex items-start justify-center min-h-full min-w-full'>
                        <div className='flex mx-auto flex-col justify-center items-center'>
                            <div className='mt-5 flex items-center justify-center gap-3'>
                                <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="usernameOrEmail"
                                    id="usernameOrEmail"
                                    value={productName}
                                    onChange={handleChange}
                                    required
                                    className=" px-3 py-2 mt-1 border border-gray-300 rounded-md"
                                />

                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => {findAProduct(productName)}}
                                >
                                    Find Products
                                </button>
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 text-sm">
                                    {errorMessage}
                                </div>
                            )}
                        </div>

                        <div className="w-[480px] mt-10 mb-20 mx-auto bg-white shadow-md rounded-md overflow-hidden">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th
                                            colSpan="3"
                                            className="py-4 px-6 bg-gray-800 text-white text-center text-lg font-semibold"
                                        >
                                            Available Shops
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="py-2 px-3 bg-gray-100 text-left text-sm font-semibold text-gray-700">Sr.</th>
                                        <th className="py-2 bg-gray-100 text-center text-sm font-semibold text-gray-700">Shop Name</th>
                                        <th className="py-2  bg-gray-100 text-center text-sm font-semibold text-gray-700">Item Count</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="max-h-44 overflow-y-auto">
                                <table className="min-w-full bg-white">
                                    <tbody>
                                        {shops.map((shop, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-2 px-4 text-left text-sm text-gray-700">{index + 1}</td>
                                                <td onClick={handleShopClick} className="py-2 text-left pl-20 text-sm text-gray-700">{shop.name}</td>
                                                <td className="py-2 text-left pr-[30px] text-sm text-gray-700">{shop.itemCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    (
                        products.map((product) => {
                            return (

                                <div key={product._id} className="max-w-[222px] max-h-[430px] min-w-[222px] min-h-[430px] m-2 overflow-hidden rounded-xl shadow-lg bg-white">
                                    <div className='min-h-full flex flex-col justify-between'>
                                        <div className="">
                                            <img
                                                className="w-full"
                                                src={product.productImage}

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
                                                <button className="w-full bg-gray-700 text-white text-sm text-left px-2 py-1 hover:bg-gray-600">
                                                    Sold By: {" " + product.seller}
                                                </button>
                                                <button className="w-full bg-gray-900 text-white font-bold py-1 hover:bg-gray-800">
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            <Footer />
        </>

    )
}

export default PublicDashboard
