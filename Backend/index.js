import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectToDB from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

// routes
import authRouter from "./routes/routes_auth.js";
import adminRouter from "./routes/admin.js";
import productRouter from "./routes/productRouter.js";
import checkRouter from "./routes/check.js";
import cartRouter from "./routes/cart.js";
import couponRouter from "./routes/coupon.js";
import categoryRouter from "./routes/category.js";
import recommendRoutes from "./routes/recommend.js";
import groqRouter from "./routes/groq.js";

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET SERVER
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId); // user-wise room
    console.log("User joined room:", userId);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

await connectToDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

// routes
app.use("/user", authRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/check", checkRouter);
app.use("/cart", cartRouter);
app.use("/coupon", couponRouter);
app.use("/category", categoryRouter);
app.use("/recommend", recommendRoutes);
app.use("/api/groq", groqRouter);

server.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);








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
