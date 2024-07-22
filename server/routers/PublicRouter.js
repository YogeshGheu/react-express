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
		return res.json({
			success: true,
			message: "ok",
			shops: shops,
		});

	} catch (error) {
		return res.json({
			success: false,
			message: "Something Went Wrong, Failed to fetch the shops !",
		});
	}
});

export default publicRouter;
