import React from 'react'
import { useState } from 'react'

import Navbar from '../partials/NavigationBar'
import Footer from '../partials/FooterBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

const AddProduct = () => {

    const fileInputRef = useRef(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('price', price);
        formData.append('image', image);


        try {
            const res = await fetch("/api/product/add-product", {
                method: "POST",
                body: formData
            })
            const response = await res.json()
            console.log("response: ", response)
            if (response.success) {
                toast.success('Product added successfully!');
                setImage(null)
                setPrice("");
                setProductDescription("");
                setProductName("");
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                toast.error('Failed to add product.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <>
            <Navbar />
            <div className='flex justify-center  max-h-[640px] min-h-[640px]'>
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
                                ref={fileInputRef}
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
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default AddProduct
