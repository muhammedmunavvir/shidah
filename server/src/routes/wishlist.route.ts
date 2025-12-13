import  express  from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistcontroller";
import { jwtverification } from "../middleware/tokenverification";

const wishlistroute=express.Router()

wishlistroute.get("/",jwtverification,getWishlist)
wishlistroute.post("/toggle",jwtverification,toggleWishlist)

export default wishlistroute