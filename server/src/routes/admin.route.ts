import { Router } from "express";
import multer from "multer";
import { uploadProductImage } from "../controllers/ProdImageUpload";

const storage = multer.memoryStorage();   // keep file in memory for Cloudinary
const upload = multer({ storage });

const adminRoute = Router();

adminRoute.post("/product-image", upload.single("file"), uploadProductImage);

export default adminRoute;
