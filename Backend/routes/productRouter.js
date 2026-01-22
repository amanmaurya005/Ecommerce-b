import Router from "express";
import { addProduct, checkSlug, deleteProduct, getProducts, getSingleProduct, updateProduct, } from "../controllers/product.js";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const fileName = req.body.slug + path.extname(file.originalname);
        cb(null, fileName);
    },
});
const uploads = multer({ storage: storage });


const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/", uploads.single("image"), addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/checkSlug/:slug",checkSlug)
productRouter.get("/:slug",getSingleProduct)

export default productRouter