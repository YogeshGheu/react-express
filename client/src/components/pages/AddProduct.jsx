import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../partials/NavigationBar';
import Footer from '../partials/FooterBar';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const navigate = useNavigate()
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        price: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('productName', formData.productName);
        form.append('productDescription', formData.productDescription);
        form.append('price', formData.price);
        form.append('image', formData.image);

        try {
            const res = await fetch("/api/product/add-product", {
                method: "POST",
                body: form,
            });

            const response = await res.json();

            if (response.success) {
                toast.success('Product added successfully!');
                setFormData({
                    productName: '',
                    productDescription: '',
                    price: '',
                    image: null,
                });
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

    useEffect(() => {
        const checkUserLoginStatus = async function () {
          try {
            const res = await fetch("/api/verify-login", { method: "POST" })
            const response = await res.json()
            if(!response.success){
                return navigate('/user/login', { state: { "error": "Something went wrong. Please Login Again." } });
            }
          } catch (error) {
            console.log("Error Occured! - ", error)
            setIsLoggedIn(false)
          }
        };
        checkUserLoginStatus()
    
      }, [])
    

    return (
        <>
            <Navbar />
            <div className='flex justify-center min-h-[640px]'>
                <div className='mt-8'>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="productName">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="productDescription">
                                Product Description
                            </label>
                            <textarea
                                id="productDescription"
                                name="productDescription"
                                value={formData.productDescription}
                                onChange={handleChange}
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
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
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
                                name="image"
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
    );
}

export default AddProduct;
