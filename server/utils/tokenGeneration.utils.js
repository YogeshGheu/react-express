import jwt from "jsonwebtoken"
import 'dotenv/config'


const generateRefreshToken = function(userObject){
    try {
        const secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;
        const token = jwt.sign({
            "id":userObject._id,
            "email":userObject.email,
        }, secret_key, {expiresIn:"15d"})
        return token;
        
    } catch (error) {
        console.log("error in refresh token generation")
        return
    }
}

const generateAccessToken = function(userObject){
    try {
        const secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;
        const token = jwt.sign({
            "id":userObject._id,
            "email":userObject.email,
            "username":userObject.username,
        }, secret_key, {expiresIn:"15m"})
        return token;
        
    } catch (error) {
        console.log("error in access token generation")
        return
    }
}


export {generateRefreshToken, generateAccessToken};