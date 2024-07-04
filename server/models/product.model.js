import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	productDescription: {
		type: String,
		required: true,
	},
	productPrice: {
		required:true,
		type: String,
	},
	productImage: {
		required:true,
		type: String,
	},
    createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

export const Product = mongoose.model("Product", productSchema)

