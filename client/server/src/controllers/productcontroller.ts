import { Request, Response } from "express";
import ProductModel from "../models/product.js";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};
