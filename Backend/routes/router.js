import { Router } from "express";
import { addData, deleteData, getData, updatedData } from "../controllers/controller.js";

const router = Router();

router.get("/",getData);
router.post("/",addData);
router.put("/",updatedData);
router.delete("/",deleteData);

export default router