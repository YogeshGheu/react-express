import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import connectDB from "./connections/connectDB.js";

const app = express();
const port = 3000;

// connect to database
try {
	connectDB("mongodb://localhost:27017/react-express-app");
} catch (error) {
	console.log("Failed to connect to DB, Something went wrong!");
}

 
// using middlewares  

app.use(cookieParser());
app.use(express.json());



// using routers

app.use("/api/user", userRouter);


// start the app 
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

//next learn how refresh and access token works
// and before that create routes and controllers(if needed)
