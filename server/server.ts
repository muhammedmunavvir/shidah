import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import productRouter from "./src/routes/productroute.js";
import passport from "passport";
import "./src/config/passport.js"; // initialize Google strategy
import authrouter from "./src/routes/auth.route.js";
import cartrouter from "./src/routes/cartroute.js";

dotenv.config();
connectDB();     

const app = express(); 

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(passport.initialize());  
 
// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/cart",cartrouter)

// Default route
app.get("/", (req, res) => {
  res.send("API is running");
}); 

// Start server
const PORT = process.env.PORT_NUMBER || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});    
           