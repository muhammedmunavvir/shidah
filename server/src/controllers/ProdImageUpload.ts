// @ts-nocheck
import cloudinary from "../lib/cloudinary";
import { Request,Response } from "express";
export const uploadProductImage = async (req:Request, res:Response) => {
   
  try {
    const file = req.file || req.files?.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
 
    // Convert buffer → base64
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: "products",
      resource_type: "auto",
    });

    return res.status(200).json({
      message: "Upload successful",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({ message: "Upload failed", error });
  }
};
