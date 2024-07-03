import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

const addProduct = async function (req, res) {
	const { productName, productDescription, price, image } = req.body;
	console.log(productName, productDescription, price, image);

	try {
		await Product.create({
			productName: productName,
			productDescription: productDescription,
			productPrice: price,
			productImage: "image URL",
		});
	} catch (error) {
		return res.status(500).json({
			success: "false",
			message: "product is not created, Internal Server Error!",
            error:error
		});
	}

	return res.status(200).json({
		success: true,
		message: "ok",
	});
};

const getProducts = async function (req, res) {
	const { productName, productDescription, price, image } = req.body;
	console.log(productName, productDescription, price, image);

	try {
		await Product.create({
			productName: productName,
			productDescription: productDescription,
			productPrice: price,
			productImage: "image URL",
		});
	} catch (error) {
		return res.status(500).json({
			success: "false",
			message: "product is not created, Internal Server Error!",
            error:error
		});
	}

	return res.status(200).json({
		success: true,
		message: "ok",
	});
};

export { addProduct, getProducts };
