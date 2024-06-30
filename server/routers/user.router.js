import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.get("/", (req, res) => {
	console.log("home");
	res.send("hello");
});


userRouter.route("/create").post(createUser);
userRouter.route("/login").post(loginUser);




export default userRouter;
