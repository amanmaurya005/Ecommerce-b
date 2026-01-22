import { Router } from "express";
import { checkForlogin } from "../middleWares/middleAuth.js";

const checkRouter = Router();

checkRouter.get("/login", checkForlogin);

export default checkRouter;