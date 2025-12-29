import { Router } from "express";
import { checkAuth } from "../middlewares/middleAuth.js";
import { addToCart, getCart, removeCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);
cartRouter.post("/add", checkAuth, addToCart);
cartRouter.delete("/:id",checkAuth, removeCart);

export default cartRouter;