import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "cloudinary"
import fs from "fs"

const addProduct = async function (req, res) {
	const { productName, productDescription, price } = req.body;
	// console.log(productName, productDescription, price);
	// console.log(req.file);
	try {

		// upload image on cloudinary
		const uploadResult = await cloudinary.uploader.upload(req.file.path)
		await fs.promises.unlink(req.file.path);

		// create the product in DB 
		const product = await Product.create({
			productName: productName,
			productDescription: productDescription,
			productPrice: price,
			productImage: uploadResult.secure_url,
		});

		// update user products array 
		await User.updateOne(
			{ email: req.user.email },
			{ $push: { products: product._id } }
		);

		// send the response
		return res.status(200).json({
			success: true,
			message: "ok",
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "product is not created, Internal Server Error!",
			error: error,
		});
	}
};

const getProducts = async function (req, res) {
	try {
		const user = await User.find({ email: req.user.email }).populate({
			path: "products",
		});
		return res.status(200).json({
			success: true,
			message: "ok",
			products: user[0].products,
		});
	} catch (error) {
		return res.status(500).json({
			success: "false",
			message: "Internal Server Error!",
			error: error,
		});
	}
};

const deleteAProduct = async function (req, res) {

	try {
		const product = await Product.findById(req.body.productId);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		const user = await User.findOne({ email: req.user.email }).exec();
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// console.log("(req) this is the product id: ", product._id );
		// console.log("(req) this is user email: ", req.user.email);

		if (user.products.includes(req.body.productId)) {

			// delete the product from products database
			await Product.findByIdAndDelete(product._id)

			// remove the product from user's products array
			user.products.pull(req.body.productId);
			await user.save();
			
			// delete the image from cloudinary
			const image_public_id = product.productImage.split("/").slice(-1)[0].split(".")[0]
			await cloudinary.uploader.destroy(image_public_id)

			console.log("Product removed");
		} else {
			console.log("Product not found in user's products array");
		}

		

		return res.status(200).json({
			success: true,
			message: "Product processed",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Something went wrong!",
		});
	}
};

export { addProduct, getProducts, deleteAProduct };
