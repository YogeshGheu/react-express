import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;



app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
	console.log("home");
	res.send("hello");
});

app.post("/test", (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
}); 
