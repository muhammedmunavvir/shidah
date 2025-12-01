import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../util/jwt";
import Usermodel from "../models/usermodel";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
  // console.log(req.body);
  // console.log(process.env.GOOGLE_CLIENT_ID);

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

     const accessToken = generateToken(
      { _id: user._id, email: user.email, role: user.role },
      "15m"   
    );

    const refreshToken = generateToken(
      { _id: user._id },
      "7d"     // refresh token → 7 days
    );


    // Set HttpOnly cookie

    // Set Access Token cookie
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none" ,
      maxAge: 5 * 60 * 1000,
    });
 
    // Set Refresh Token cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none" ,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Return response
    // console.log(res.cookie.auth_token,"auth token")
    return res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};




 