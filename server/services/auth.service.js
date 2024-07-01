import jwt from "jsonwebtoken"
import "dotenv/config"

// get the env secret key and decode the token, then implement the middleware

const verifyAccessToken = function(token){
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    return payload;
}


const verifyRefreshToken = function(token){
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    return payload;
}


export {verifyAccessToken, verifyRefreshToken}