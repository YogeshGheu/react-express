import express from "express";
import { addProduct, getProducts, deleteAProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(upload.single("image"), addProduct);
productRouter.route("/get-products").get(getProducts);
productRouter.route("/remove-product").post(deleteAProduct)



export default productRouter;
