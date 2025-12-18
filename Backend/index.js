import express from "express";
import connectToDB from "./db/connect.js";
// import router from "./routes/router.js";
// import productRouter from "./routes/productRouter.js"
import authRouter from "./routes/routes_auth.js"
import adminRouter from "./routes/admin.js"
import cors from "cors"
import productRouter from "./routes/productRouter.js";
import checkRouter from "./routes/check.js";
import cartRouter from "./routes/cart.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cookieParser());

await connectToDB();


app.use("/uploads", express.static("uploads"));


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));

// app.use("/",router);
// app.use("/product",productRouter);
app.use("/user", authRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/check", checkRouter);
app.use("/cart", cartRouter);

app.listen(3000, () => console.log("Server started at port 3000"));
