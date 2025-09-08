import  express  from "express";
import {  fetchsingleproduct, getProducts } from "../controllers/productcontroller.js";

const productrouter=express.Router()

productrouter.get("/getallproducts",getProducts)
productrouter.get("/fetchsingleproduct/:id",fetchsingleproduct)

export default productrouter 