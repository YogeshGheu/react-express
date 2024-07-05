import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../services/auth.service.js";
// import cookieParser from "cookie-parser";

const getUserDetails = async function (req, res) {
	//- "/api/app/get-user-details"
	// user should be already verified my auth middleware
	const payload = verifyAccessToken(req.cookies["Access Token"]);
	try {
		const user = await User.findOne({ email: payload.email }).select(
			"-__v -password -refreshToken"
		);
		return res.json({
			success: true,
			user: user,
		});
	} catch (error) {
		return res.json({
			success: false,
			user: "something went wrong",
		});
	}
};

export { getUserDetails };
