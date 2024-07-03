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
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
});

export const Product = mongoose.model("Product", productSchema)

