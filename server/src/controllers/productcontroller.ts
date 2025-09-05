import { Request, Response } from "express";
import ProductModel from "../models/product.js";
import { CartModel } from "../models/cartmodel.js";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const fetchsingleproduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.params, "params ");
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

export const addtocart = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  try {
    const { productId, qty, userId } = req.body;
    if (!userId || !productId) {
      res.status(400).json({ message: "userId and productId are required" });
      return;
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ productId, qty: qty || 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        console.log("item already in your cart");
      } else {
        cart.items.push({ productId, qty: qty || 1 });
      }
    }

    await cart.save();

    res.status(201).json({ message: "Added to cart", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};
