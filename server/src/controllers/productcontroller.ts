import { Request, Response } from "express";
import ProductModel from "../models/product.js";
import { CartModel } from "../models/cartmodel.js";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = req.query.limit
      ? Number(req.query.limit)
      : null;

    let query = ProductModel.find().sort({ createdAt: -1 });

    if (limit) {
      query = query.limit(limit);
    }

    const products = await query;

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

export const fetchsingleproduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};

