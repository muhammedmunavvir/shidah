import { Request, Response } from "express";
import { OrderModel } from "../models/OrderModel";

export const myOrdersController = async (req: Request, res: Response) => {
  
  try {
    const userId = (req as any).user?._id || req.params.userId;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID missing" });
    }

    const orders = await OrderModel.find({  "userInfo.userId": userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "Fetched user orders successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching orders",
    });
  }
};
