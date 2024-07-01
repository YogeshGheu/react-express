import jwt from "jsonwebtoken";
import "dotenv/config";

// get the env secret key and decode the token, then implement the middleware

const verifyAccessToken = function (token) {
	if (!token) {
		return;
	}
	try {
		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
		return payload;
	} catch (error) {
		return false;
	}
};

const verifyRefreshToken = function (token) {
	if (!token) {
		return;
	}
	try {
		const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
		return payload;
	} catch (error) {
		return false; 
	}
};

export { verifyAccessToken, verifyRefreshToken };
