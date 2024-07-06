import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

const addProduct = async function (req, res) {
	const { productName, productDescription, price } = req.body;
	// console.log(productName, productDescription, price);
	// console.log(req.file);
	try {
		const product = await Product.create({
			productName: productName,
			productDescription: productDescription,
			productPrice: price,
			productImage: `/public/uploads/${req.file.filename}`,
		});

		// const ObjId = new mongoose.Types.ObjectId(product._id)
		const ObjId = product._id;

		const user = await User.updateOne(
			{ email: req.user.email },
			{ $push: { products: product._id } }
		);
		// console.log(user);
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "product is not created, Internal Server Error!",
			error: error,
		});
	}

	return res.status(200).json({
		success: true,
		message: "ok",
	});
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

export { addProduct, getProducts };
