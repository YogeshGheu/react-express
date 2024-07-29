import { User } from "../models/user.model.js";

import express from "express";
const publicRouter = express.Router();

// sending products of the specific shop to the client
publicRouter.post("/get-products", async (req, res) => {
	if (!req.body.emailOrShopName) {
		return res.json({
			success: false,
			message: "Please Enter a Valid Input!",
		});
	}
	try {
		const user = await User.find({
			$or: [
				{ email: req.body.emailOrShopName },
				{ shopName: req.body.emailOrShopName },
				{ username: req.body.emailOrShopName },
			],
		}).populate({ path: "products" });

		return res.json({
			success: true,
			message: "ok",
			products: user[0].products,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: "User not found, Please try again with another user!",
		});
	}
});

// send all the shop names and thir product count to the client
publicRouter.get("/get-shops", async (req, res) => {
	const shops1 = [{ name: "yogesh", itemCount: 30 }];

	try {
		const shops = [];
		const allUsers = await User.find();

		for (let index = 0; index < allUsers.length; index++) {
			const singleUser = allUsers[index];
			const shopName = {
				name: singleUser.username,
				itemCount: singleUser.products.length,
			};
			shops.push(shopName);
		}

		// sorting the shop names based on the usernames
		shops.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0; // a.name must be equal to b.name
		});
		if (!shops.length == 0) {
			return res.json({
				success: true,
				message: "ok",
				shops: shops,
			});
		} else{
			return res.json({
				success: true,
				message: "No seller found !",
				shops: [{ "name": "Not Sellers are listed !", itemCount: "0" }]
			});
		}
	} catch (error) {
		return res.json({
			success: false,
			message: "Something Went Wrong, Failed to fetch the shops !",
		});
	}
});

// get all the products of a specific name
publicRouter.post("/get-a-product", async (req, res) => {
	// console.log(req.body); //-> output: { productName: 'something' }
	if (!req.body.productName) {
		return res.json({
			success: false,
			message: "Please Enter a Valid Input!",
		});
	}
	const requiredProducts = [];
	try {
		const users = await User.find().populate({ path: "products" });

		users.forEach((user) => {
			user.products.forEach((product) => {
				if (product.productName == req.body.productName) {
					requiredProducts.push({
						product: product,
						seller: user.username,
					});
				}
			});
		});

		if (!requiredProducts.length == 0) {
			return res.json({
				success: true,
				message: "ok",
				products: requiredProducts,
			});
		} else {
			return res.json({
				success: false,
				message: "Item is not listed!",
			});
		}
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
			message: "Item is not listed!",
		});
	}
});

export default publicRouter;
