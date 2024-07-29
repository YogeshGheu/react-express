import React from 'react'
import Navbar from "../partials/NavigationBar"
import Footer from "../partials/FooterBar"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  const fetchProducts = async function () {
    try {
      const res = await fetch("/api/product/get-products", { method: "GET" })
      const response = await res.json();
      if (!response.success) {
        return navigate('/user/login', { state: { "error": "Something went wrong! Please Login Again." } });
      }
      const productsArray = response.products
      setProducts(productsArray)

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  const handleDeleteProduct = async function (productId) {
    try {
      const body = {
        "productId": productId
      }
      const res = await fetch(
        "/api/product/remove-product",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const response = await res.json();
      if (!response.success) {
        return navigate('/user/login', { state: { "error": "Something went wrong! Please Login Again." } });
      }
      fetchProducts()
    } catch (error) {
      console.error("Error Occured: ", error);
    }
  }


  return (


    <div>
      <Navbar />


      <div className='flex flex-row flex-wrap max-h-[640px] min-h-[640px] overflow-scroll'>
        {products.map((product) => {
          return (
            <div key={product._id} className="max-w-[222px] max-h-[430px] min-w-[222px] min-h-[430px] m-2 overflow-hidden rounded-xl shadow-lg bg-white">
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
                    <button onClick={() => { handleDeleteProduct(product._id) }} className="w-full bg-gray-700 text-white font-bold py-1 hover:bg-gray-600">
                      Delete
                    </button>
                    <button className="w-full bg-gray-900 text-white font-bold py-1 hover:bg-gray-800">
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
