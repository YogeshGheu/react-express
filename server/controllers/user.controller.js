import { User } from "../models/user.model.js";
import {generateRefreshToken, generateAccessToken} from "../utils/tokenGeneration.utils.js";
import {
	encryptPassword,
	isPasswordValid,
} from "../services/encryption.service.js";

const createUser = async function (req, res) {
	// check if the user already exists
	const user = await User.findOne({
		$or: [{ email: req.body.email }, { username: req.body.username }],
	});
	if (user) {
		return res.status(400).json({
			message: "user already exists!",
		});
	}

	// create a new user in the DB

	// first create a refresh token for the user
	const refreshToken = generateRefreshToken({
		id: req.body._id,
		email: req.body.email,
		username: req.body.username,
	});

	// now create the user in the DB

	//hash the user password before storing in the DB
	const encryptedPassword = await encryptPassword(req.body.password);

	try {
		await User.create({
			email: req.body.email,
			username: req.body.username,
			password: encryptedPassword,
			refreshToken: refreshToken,
		});
	} catch (error) {
		return res.status(500).json({
			message: "error occured while createing the user!",
		});
	}
	// sending the created user as a response after fetching from the DB
	try {
		const createdUser = await User.findOne({
			email: req.body.email,
		}).select("-password -refreshToken -__v");
		res.status(201).json({
			success: true,
			message: "user is created",
			user: createdUser,
		});
	} catch (error) {
		res.status(500).json({
			message: "error occured while createing the user!",
		});
	}
};

const loginUser = async function (req, res) {
	const username = req.body.usernameOrEmail;
	const email = req.body.usernameOrEmail;

	const user = await User.findOne({
		$or: [{ username }, { email }],
	});

    //check if the user exists or not
	if (!user) {
		return res
			.status(404)
			.json({ success: false, message: "no user found!" });
	}

    // now check the password 
    const isValidPassword = await isPasswordValid(req.body.password, user.password)
	if(isValidPassword){ 

        //generate access & refresh tokens and send to the client in httpOnly cookies

        const accessToken = generateAccessToken({ id: user._id, email: user.email, username: user.username });
        console.log("accessToken: ", accessToken);

        const refreshToken = generateRefreshToken({ id: user._id, email: user.email});
        console.log("refreshToken: ", refreshToken)
        
        // Update the refresh token in the DB
		user.refreshToken = refreshToken;
		await user.save();

        const options = {
            httpOnly:true,
            sameSite: 'Strict',
            secure:true,
            maxAge:15000,
        }
        
        res.cookie("Access Token", accessToken, {...options, maxAge:900000}); //900000 millisec = 15 minutes
        res.cookie("Refresh Token", refreshToken, {...options, maxAge:86400000}); //86400000 millisec = 1day

        
        res.json({ success: true, message: "user logged in" });
    } else{
        res.status(401).json({
            success:false,
            message:"incorrect password!"
        })
    }

	
};

export { createUser, loginUser };
