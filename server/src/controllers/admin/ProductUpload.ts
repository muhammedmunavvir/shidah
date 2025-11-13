import ProductModel from "../../models/product";
import { Request,Response } from "express";
export const createProduct = async (req:Request, res:Response) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      currency,
      stock,
      category,
      badge,
      sizes,
      colors,
      images,
      isBestSeller,
      isPremium,
      tags,
    } = req.body;

    // Example using Mongoose
    const newProduct = await ProductModel.create({
      name,
      description,
      price,
      discountPrice,
      currency,
      stock,
      category,
      badge,
      sizes,
      colors,
      images,
      isBestSeller,
      isPremium,
      tags,
    });

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};
