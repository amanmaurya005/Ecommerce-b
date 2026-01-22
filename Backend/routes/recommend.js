import { Router } from "express";
import { recommendProducts } from "../controllers/recommendController.js";

const recommendRoutes = Router();

recommendRoutes.post("/", recommendProducts);

export default recommendRoutes;
