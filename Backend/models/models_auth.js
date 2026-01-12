import { Schema, model } from "mongoose";

const authSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true, min: 4, max: 30 },
  phone: { type: Number, sparse: true, unique: true },
  password: { type: String, min: 8, max: 60 }, //[select: false] for not showing password in queries
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true, },
  image: { type: String },
  authProvider: { type: String, enum: ["local", "google"], default: "local", },
  role: { type: String },
  otp: String,
  otpExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerifyToken: String,
  emailVerifyExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true }
);

const Auth = model("auth", authSchema, "auth");
export default Auth;