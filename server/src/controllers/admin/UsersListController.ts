import Usermodel from "../../models/usermodel";
import { Request, Response } from "express";

export const GetAllusers = async (req: Request, res: Response) => {
  try {
    const Allusers = await Usermodel.find();
    res.json({ status: "success", message: "Get All users", data: Allusers });
  } catch (error) {
    console.log(error);
  }
};
