// import express from "express";
// import connectToDB from "./db/connect.js";
// // import router from "./routes/router.js";
// // import productRouter from "./routes/productRouter.js"
// import authRouter from "./routes/routes_auth.js"
// import adminRouter from "./routes/admin.js"
// import cors from "cors"
// import productRouter from "./routes/productRouter.js";
// import checkRouter from "./routes/check.js";
// import cartRouter from "./routes/cart.js";
// import cookieParser from "cookie-parser";
// import couponRouter from "./routes/coupon.js"
// import githubUser from "./routes/githubUser.js"
// import "dotenv/config";
// import { checkAuth } from "./middleWares/middleAuth.js";
// import categoryRouter from "./routes/category.js";
// import recommendRoutes from "./routes/recommend.js";
// import groqRouter from "./routes/groq.js";



// const app = express();
// app.use(express.json({ limit: "10mb" }));

// app.use(cookieParser());

// await connectToDB();
// const frontendUrl = process.env.FRONTEND_URL;

// app.use("/uploads", express.static("uploads"));


// app.use(
//     cors({
//         origin: frontendUrl,
//         methods: ["GET", "PUT", "POST", "DELETE","PATCH"],
//         credentials: true,
//     }));

// // app.use("/",router);
// // app.use("/product",productRouter);
// app.use("/user", authRouter);
// app.use("/admin", adminRouter);
// app.use("/product", productRouter);
// app.use("/check", checkRouter);
// app.use("/cart", cartRouter);
// app.use("/coupon", couponRouter);
// app.use("/category", categoryRouter);
// app.use("/recommend", recommendRoutes);
// app.use("/api/groq", groqRouter);


// // app.use("/user", githubUser);

// app.listen(3000, () => console.log("Server started at port 3000"));













import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

// ✅ ROUTES (same as your project)
import authRouter from "./routes/routes_auth.js";
import adminRouter from "./routes/admin.js";
import productRouter from "./routes/productRouter.js";
import checkRouter from "./routes/check.js";
import cartRouter from "./routes/cart.js";
import couponRouter from "./routes/coupon.js";
import categoryRouter from "./routes/category.js";
import recommendRoutes from "./routes/recommend.js";
import groqRouter from "./routes/groq.js";

// ✅ MYSQL CONNECTION
import pool from "./db/mysql.js";

const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

const frontendUrl = process.env.FRONTEND_URL;

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ---------- TEST MYSQL CONNECTION ----------
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
  }
})();

// ---------- ROUTES (same as Mongo backend) ----------
app.use("/user", authRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/check", checkRouter);
app.use("/cart", cartRouter);
app.use("/coupon", couponRouter);
app.use("/category", categoryRouter);
app.use("/recommend", recommendRoutes);
app.use("/api/groq", groqRouter);

// ---------- SERVER ----------
app.listen(3000, () => {
  console.log("🚀 Server started at port 3000 (MySQL)");
});
