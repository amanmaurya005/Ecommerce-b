import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category.js";

const categoryRouter = Router();

categoryRouter.get("/",getCategory)
categoryRouter.post("/add", createCategory);

export default categoryRouter;
