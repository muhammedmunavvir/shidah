import express from "express";
import { addtocart, Getcartcontroller } from "../controllers/cartcontroller.js";

const cartrouter = express.Router();
cartrouter.get("/getusercart/:userId", Getcartcontroller);
cartrouter.post("/addtocart", addtocart);

export default cartrouter;
