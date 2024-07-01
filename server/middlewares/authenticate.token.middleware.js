import {
	verifyAccessToken,
	verifyRefreshToken,
} from "../services/auth.service.js";
import { User } from "../models/user.model.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/tokenGeneration.utils.js";

const authenticateToken = async function (req, res, next) {
	try {
		const accessToken = req.cookies["Access Token"];
		const refreshToken = req.cookies["Refresh Token"];

		// if no refresh or access token in the request cookies login again
		if (!accessToken && !refreshToken) {
			return res.status(401).json({
				success: false,
				message: "No Access or Refresh Token Found, Please Login Again!",
			});
		}

		// if no refresh token in the req cookies login again
		if (!refreshToken) {
			return res.status(401).json({
				success: false,
				message: "No Refresh Token Found, Please Login Again!",
			});
		}

		// If access token is missing but refresh token is present
		if (!accessToken && refreshToken) {
			const user = await User.findOne({ refreshToken: refreshToken });

			if (!user) {
				return res.status(401).json({
					success: false,
					message: "Unauthorised request",
				});
			}

			// Verify refresh token
			const isRefreshTokenValid = verifyRefreshToken(user.refreshToken);
			if (!isRefreshTokenValid) {
				return res.status(401).json({
					success: false,
					message: "Refresh Token Expired, Please Login Again !",
				});
			}

			// generate new tokens
			const newAccessToken = generateAccessToken(user);
			const newRefreshToken = generateRefreshToken(user);

			// Update the refresh token in the DB
			user.refreshToken = newRefreshToken;
			await user.save();

			const options = {
				httpOnly: true,
				sameSite: "Strict",
			};

			// Set new tokens in cookies
			res.cookie("Access Token", newAccessToken, {
				...options,
				maxAge: 900000,
			}); // 15 minutes
			res.cookie("Refresh Token", newRefreshToken, {
				...options,
				maxAge: 86400000,
			}); // 1day

			// Retry the original request after refreshing tokens
			req.cookies["Access Token"] = newAccessToken;
			req.cookies["Refresh Token"] = newRefreshToken;
			return authenticateToken(req, res, next);
		}

		// Verify both tokens if they are present
		try {
			const accessTokenConfirmation = verifyAccessToken(accessToken);
			const refreshTokenConfirmation = verifyRefreshToken(refreshToken);

			if (accessTokenConfirmation && refreshTokenConfirmation) {
				next();
			} else {
				return res.status(401).json({
					success: false,
					message: "Invalid tokens, please login again",
				});
			}
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Token verification failed, please login again",
			});
		}
	} catch (error) {
		console.error("Something went wrong!", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export { authenticateToken };
