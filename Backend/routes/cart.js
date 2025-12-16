import { Router } from "express";
import { checkAuth } from "../middlewares/middleAuth.js";
import {addToCart} from "../controllers/cart.js";

const cartRouter=Router();

cartRouter.post("/add",checkAuth, addToCart);

export default cartRouter;