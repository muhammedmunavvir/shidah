import { OrderModel } from "../../models/OrderModel";
import Usermodel from "../../models/usermodel";
import { Request, Response } from "express";

export const GetAllOrders = async (req: Request, res: Response) => {
  try {
    const Allorders = await OrderModel.find();
    res.json({ status: "success", message: "Get All users", data: Allorders });
  } catch (error) {
    console.log(error);
  }
};
