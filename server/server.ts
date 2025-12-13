import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db";
import productRouter from "./src/routes/productroute";
import authrouter from "./src/routes/auth.route";
import cartrouter from "./src/routes/cartroute";
import Ordercreationroute from "./src/routes/OrderCreation.route";
import myorderRoute from "./src/routes/myorder.route";
import adminRoute from "./src/routes/admin.route";
import cookieParser from "cookie-parser";
import { checkMaintenanceMode } from "./src/middleware/maintenanceMiddleware";
import wishlistroute from "./src/routes/wishlist.route";
dotenv.config();
connectDB();

const app = express();

// CORS for development + production
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://shidah.vercel.app",  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["set-cookie"]
}));

app.use(express.json());
app.use(cookieParser());

// Admin Routes
app.use("/api/v1/admin", adminRoute);
// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authrouter);
// app.use(checkMaintenanceMode)
app.use("/api/v1/cart", cartrouter);
app.use("/api/v1/order", Ordercreationroute);
app.use("/api/v1/order", myorderRoute);
app.use("/api/v1/wishlist", wishlistroute); 
 

 
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
