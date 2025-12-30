import { Router } from "express";
import { checkAuth } from "../middleWares/middleAuth.js";
import { addToCart, getCart, removeCart, updateCartQuantity, } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);
cartRouter.post("/add", checkAuth, addToCart);
cartRouter.delete("/:id",checkAuth, removeCart);
cartRouter.patch("/quantity/:id",checkAuth, updateCartQuantity);


export default cartRouter;