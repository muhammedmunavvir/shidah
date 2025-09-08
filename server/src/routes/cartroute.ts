import  express  from "express";
import { addtocart } from "../controllers/cartcontroller.js";

const cartrouter=express.Router()

cartrouter.post("/addtocart",addtocart)
 
export default cartrouter