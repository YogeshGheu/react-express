import { User } from "../models/user.model.js";
import { generateRefreshToken } from "../utils/token.utils.js";

const createUser = async function (req, res) {
	// check if the user already exists
	const user = await User.findOne({
		$or: [{ email: req.body.email }, { username: req.body.username }],
	});
	if (user) {
		return res.status(400).json({
            "message":"user already exists!"
        });
	}

	// create a new user in the DB

    // first create a refresh token for the user
	const refreshToken = generateRefreshToken({
		id: req.body._id,
		email: req.body.email,
		username: req.body.username,
	});

	try {
		await User.create({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			refreshToken: refreshToken,
		});
        res.status(201).json({
            success:true,
            message:"user is created"
        })
	} catch (error) {
		res.status(500).json({
            message:"error occured while createing the user!"
        });
	}
	
};


export { createUser };
