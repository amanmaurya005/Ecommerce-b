import Auth from "../models/models_auth.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { sendOtpEmail } from "../utils/sendEmail.js";
import { createHash } from "crypto";


export async function getUsers(req, res) {
    try {
        const users = await Auth.find();
        if (!users || users.length == 0) {
            return res.status(400).json({ message: "No Users Found" });
        }
        else {
            return res.status(200).json(users)
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export async function loginUser(req, res) {
    try {
        const data = req.body;
        if (!UserExist.isVerified) {
            return res.status(403).json({ message: "Please verify your account first" });
        }

        const UserExist = await Auth.findOne({ email: data.email });
        if (!UserExist)
            return res.status(400).json({ message: "User not found" });


        const doesPasswordMatch = await bcrypt.compare(data.password, UserExist.password);
        if (!doesPasswordMatch)
            return res.status(404).json({ message: "password not match" });
        console.log(doesPasswordMatch);

        if (UserExist.role !== "user")
            return res.status(404).json({ message: "You are not a user" });

        const auth_token = jwt.sign({
            id: UserExist._id,
            role: UserExist.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.cookie("auth_token", auth_token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600 * 1000,
        });



        return res.status(200).json({ message: "LogedIn" });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
export async function logoutUser(req, res) {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // any negative time

        });
        return res.status(200).json({ message: "user Logged out" });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function registerUser(req, res) {
    try {
        const data = req.body;

        //  Check if user already exists
        const existEmail = await Auth.findOne({ email: data.email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const existUser = await Auth.findOne({ username: data.username })
        if (existUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const existPhone = await Auth.findOne({ phone: data.phone });
        if (existPhone) {
            return res.status(400).json({ message: "Phone already exists" });

        };

        data.role = "user";
        //  Password Hashing
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const newUser = new Auth(data);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = createHash("sha256").update(otp).digest("hex");

        data.otp = hashedOtp;
        data.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
        data.isVerified = false;


        await newUser.save();




        await sendOtpEmail(data.email, data.name, otp);

        res.status(201).json({ message: "User registered successfully. Email sent", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id Parameter is required" });
        }
        const userDeleted = await Auth.findByIdAndDelete(id);
        if (!userDeleted) {
            return res.status(404).json({ message: "User not found with this parameter" });
        }
        return res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updatedRecord = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }
        if (!updatedRecord) {
            return res
                .status(400)
                .json({ message: "Updated product schema is required" });
        }

        const updatedUser = await Auth.findByIdAndUpdate(id, updatedRecord, {
            new: true,
        });
        if (!updatedUser)
            return res.status(404).json({ message: "Could not update this product" });

        return res.status(200).json({ message: "Product Updated", product: updatedUser });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function verifyOtp(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await Auth.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

      
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not found. Please register again." });
    }

    // Correct expiry check
    if (new Date(user.otpExpiry).getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

        const hashedOtp = createHash("sha256").update(otp).digest("hex");

        if (hashedOtp !== user.otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({ message: "Account verified successfully. You can now login." });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



