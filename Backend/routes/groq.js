import { Router } from "express";
import { askProductGroq } from "../controllers/groqController.js";

const groqRouter = Router();

groqRouter.post("/ask-product", askProductGroq);

export default groqRouter;
