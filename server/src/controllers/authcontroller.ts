import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../util/jwt";
import Usermodel from "../models/usermodel";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(process.env.GOOGLE_CLIENT_ID);

  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "No Google credential provided" });
    }

    // Verify Google credential
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const { email, name, picture, sub } = payload;

    // Find or create user
    let user = await Usermodel.findOne({ email });

    if (!user) {
      user = new Usermodel({
        googleId: sub,
        email,
        userName: name,
        avatar: picture,
      });
      await user.save();
    }

    // Create JWT
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });

    // Set HttpOnly cookie
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
   domain: ".shidah.vercel.app",
      path: "/",
      maxAge: 60 * 1000,
    });

    // Return response
    return res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};
