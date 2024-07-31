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
		// console.log("(req) this is the product id: ", product._id);
		// console.log("(req) this is user email: ", req.user.email);

		if (user.products.includes(req.body.productId)) {
			user.products.pull(req.body.productId);
			await user.save();
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
