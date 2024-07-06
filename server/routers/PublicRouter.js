import { User } from "../models/user.model.js";

const publicRouter = async function (req, res) {
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
};

export { publicRouter };
