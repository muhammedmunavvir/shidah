import  express  from "express";
import { addtocart, fetchsingleproduct, getProducts } from "../controllers/productcontroller.js";

const productrouter=express.Router()

productrouter.get("/getallproducts",getProducts)
productrouter.get("/fetchsingleproduct/:id",fetchsingleproduct)
productrouter.post("/addtocart",addtocart)

export default productrouter 