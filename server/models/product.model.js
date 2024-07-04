import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	productName: {
		required:true,
		type: String,
		required: true,
	},
	productDescription: {
		required:true,
		type: String,
		required: true,
	},
	productPrice: {
		required:true,
		type: String,
		required: true,
	},
	productImage: {
		required:true,
		type: String,
		required: true,
	},
    createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

export const Product = mongoose.model("Product", productSchema)

