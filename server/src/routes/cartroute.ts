import express from "express";
import { addtocart, Getcartcontroller, RemoveCartItem, updateCartQuantity } from "../controllers/cartcontroller.js";

const cartrouter = express.Router();
cartrouter.get("/getusercart/:userId", Getcartcontroller);
cartrouter.post("/addtocart", addtocart);
cartrouter.delete("/removecartitem/:userId/:productId", RemoveCartItem);
cartrouter.put("/update-quantity", updateCartQuantity);

export default cartrouter;
