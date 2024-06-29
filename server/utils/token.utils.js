import jwt from "jsonwebtoken"
import 'dotenv/config'


const generateRefreshToken = function(payload){
    try {
        const secret_key = process.env.REFRESH_TOKEN_SECRET_KEY;
        const token = jwt.sign({
            "id":payload._id,
            "email":payload.email,
            "username":payload.username,
        }, secret_key, {expiresIn:"15d"})
        return token;
        
    } catch (error) {
        console.log("error in refresh token generation")
        return
    }
}


export {generateRefreshToken};