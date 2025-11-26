import express from "express";
import { addtocart, Getcartcontroller, RemoveCartItem, updateCartQuantity } from "../controllers/cartcontroller.js";
import { jwtverification } from "../middleware/tokenverification.js";

const cartrouter = express.Router();
cartrouter.get("/getusercart/:userId",jwtverification, Getcartcontroller);
cartrouter.post("/addtocart",jwtverification, addtocart);
cartrouter.delete("/removecartitem/:userId/:productId",jwtverification, RemoveCartItem);
cartrouter.put("/update-quantity",jwtverification, updateCartQuantity);

export default cartrouter;
