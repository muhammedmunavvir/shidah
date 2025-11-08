import { Request, Response } from "express"
import { generateToken } from "../util/jwt.js";
import dotenv from "dotenv"
dotenv.config()




export const googleAuthCallback =async(req:Request,res:Response)=>{
    try {
    const user = req.user as any; // Passport sets req.user
    const token = generateToken({ id: user._id, email: user.email, role: user.role ,avatar: user.avatar,});
       res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    // Redirect client with token
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  } catch (err) {
    res.status(500).json({ status: "error", message: "Google login failed" });
  }
}