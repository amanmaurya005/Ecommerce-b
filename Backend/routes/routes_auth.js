import { Router } from "express";
import { getUsers, loginUser, logoutUser, registerUser, deleteUser, updateUser } from "../controllers/controllers_auth.js";

const authRouter = Router();

authRouter.get("/", getUsers);
authRouter.post("/login", loginUser)
authRouter.post("/logout", logoutUser)
authRouter.post("/register", registerUser)
authRouter.delete("/:id", deleteUser)
authRouter.put("/:id", updateUser)


export default authRouter