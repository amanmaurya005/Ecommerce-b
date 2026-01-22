import { Router } from "express";
import { getUsers, loginUser, logoutUser, registerUser, deleteUser, updateUser, verifyOtp, } from "../controllers/controllers_auth.js";
import { googleLogin } from "../controllers/googleLogin.js";

const authRouter = Router();

authRouter.get("/", getUsers);
authRouter.post("/login", loginUser)
authRouter.post("/logout", logoutUser)
authRouter.post("/register", registerUser)
authRouter.delete("/:id", deleteUser)
authRouter.put("/:id", updateUser)
authRouter.post("/google-login", googleLogin);
authRouter.post("/verify-otp", verifyOtp);


export default authRouter