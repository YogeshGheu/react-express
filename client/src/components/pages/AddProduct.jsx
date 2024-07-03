import React from 'react'
import { useState } from 'react'

import Navbar from '../partials/NavigationBar'
import Footer from '../partials/FooterBar'

const AddProduct = () => {

    const [productName, setProductName] = useState('laptop');
    const [productDescription, setProductDescription] = useState('this is a laptop');
    const [price, setPrice] = useState('20');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('price', price);
        formData.append('image', image);


        const res = await fetch("/api/product/add-product", {
            method : "POST",
            body:formData
        })
        const response = await res.json()
        console.log("response: ", response)
        
        
        // Handle form submission
        console.log({
            productName,
            productDescription,
            price,
            image
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    return (
        <>
            <Navbar />
            <div className='mt-8'>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="productName">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="border rounded w-full py-2 px-3 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="productDescription">
                            Product Description
                        </label>
                        <textarea
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="border rounded w-full py-2 px-3 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border rounded w-full py-2 px-3 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="image">
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border rounded w-full py-2 px-3 focus:outline-none"
                        />
                    </div>
                    <div className="flex w-full mt-5 items-center">
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default AddProduct
