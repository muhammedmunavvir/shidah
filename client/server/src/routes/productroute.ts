import  express  from "express";
import { getProducts } from "../controllers/productcontroller.js";

const productrouter=express.Router()

productrouter.get("/getallproducts",getProducts)

export default productrouter