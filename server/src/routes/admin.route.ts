import { Router } from "express";
import multer from "multer";
import { uploadProductImage } from "../controllers/ProdImageUpload";
import { createProduct } from "../controllers/admin/ProductUpload";
import { GetAllusers } from "../controllers/admin/UsersListController";
import { GetAllOrders } from "../controllers/admin/Order-list-controller";

const storage = multer.memoryStorage();   // keep file in memory for Cloudinary
const upload = multer({ storage });

const adminRoute = Router();

adminRoute.post("/product-image", upload.single("image"), uploadProductImage);
adminRoute.post("/product-createProduct", createProduct);
adminRoute.get("/usersList", GetAllusers);
adminRoute.get("/allOrders", GetAllOrders);

export default adminRoute;
    