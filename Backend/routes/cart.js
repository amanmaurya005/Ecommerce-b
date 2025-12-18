import { Router } from "express";
import { checkAuth } from "../middlewares/middleAuth.js";
import { addToCart, getCart } from "../controllers/cart.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);
cartRouter.post("/add", checkAuth, addToCart);

export default cartRouter;