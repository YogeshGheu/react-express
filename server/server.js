import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import appRouter from "./routers/app.router.js";
import productRouter from "./routers/product.router.js";
import connectDB from "./connections/connectDB.js";
import { authenticateToken } from "./middlewares/authenticate.token.middleware.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// connect to database
try {
	connectDB("mongodb://localhost:27017/react-express-app");
} catch (error) {
	console.log("Failed to connect to DB, Something went wrong!");
}

// Serve static files
app.use(
	"/public/uploads",
	express.static(path.resolve(__dirname, "./public/uploads"))
);

// using middlewares
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/app", authenticateToken);
app.use("/api/product", authenticateToken);
app.use("/api/verify-login", authenticateToken);

// using routers

app.use("/api/user", userRouter);
app.use("/api/app", appRouter);
app.use("/api/product", productRouter);

app.post("/api/verify-login", (req, res) => {
	console.log("req.body");
	res.json({
		success: true,
	});
});

app.post("/api/public-user/get-products", (req, res) => {
	console.log(req.body);
	res.json({ message: "hello from server" });
});

// start the app
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// need to reconfigure the routes, so any user can see the homepage
// but how he will fetch the products related to a user
