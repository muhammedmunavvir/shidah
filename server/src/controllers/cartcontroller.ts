import { Request, Response } from "express";
import { CartModel } from "../models/cartmodel.js";
import { Types } from "mongoose";

export const Getcartcontroller = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const usercart = await CartModel.find({ userId }).populate(
      "items.productId"
    );
    return res
      .status(200)
      .json({ status: "success", message: "Got user cart", data: usercart });
  } catch (error) {
    console.log(error);
  }
};

export const addtocart = async (req: Request, res: Response) => {
  console.log(req.body);
  
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

export const RemoveCartItem = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;

  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid userId or productId" });
  }

  try {
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: new Types.ObjectId(productId) } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove item" });
  }
};

export const updateCartQuantity = async (req: Request, res: Response) => {
  console.log(req.body,"req.body")
  try {
    const { userId, productId, qty } = req.body;

    if (!userId || !productId || typeof qty !== "number") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    if (qty < 1) { 
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // update quantity
    cart.items[itemIndex].qty = qty;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cart,
    });
  } catch (error) {
    console.error("Update quantity error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
