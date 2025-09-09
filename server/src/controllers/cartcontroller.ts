import { Request, Response } from "express";
import { CartModel } from "../models/cartmodel.js";
import { Types } from "mongoose";

export const Getcartcontroller = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const usercart = await CartModel.find( {userId} ).populate("items.productId");
    return res
      .status(200)
      .json({ status: "success", message: "Got user cart", data: usercart });
  } catch (error) {
    console.log(error);
  }
};

export const addtocart = async (req: Request, res: Response) => {
  try {
    const { productId, qty, userId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }

    if (!Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const productObjectId = new Types.ObjectId(productId);

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ productId: productObjectId, qty: qty || 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        return res
          .status(200)
          .json({ message: "Item already in your cart", cart });
      }

      cart.items.push({ productId: productObjectId, qty: qty || 1 });
    }

    await cart.save();
    return res.status(201).json({ message: "Added to cart", cart });
  } catch (error: any) {
    console.error("Add to cart error:", error.message || error);
    return res.status(500).json({ message: "Failed to add to cart" });
  }
};
