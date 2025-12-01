import Usermodel from "../models/usermodel";
import { generateToken, verifyToken } from "../util/jwt";
import { Request,Response } from "express";
export const refreshAccessToken = async (req: Request, res: Response) => {
  console.log("refresh token triggered");
  
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "NO_REFRESH_TOKEN" });
  }

  try {
    const decoded = verifyToken(refreshToken); // only contains _id

    // 1️⃣ Fetch user from DB
    const user = await Usermodel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }


    // 2️⃣ Generate new access token with FULL payload
    const newAccessToken = generateToken(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      "5m"
    );

    // 3️⃣ Set new cookie
    res.cookie("auth_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none" ,
      maxAge: 15 * 60 * 1000,
    });

    // 4️⃣ Return updated user
    return res.json({
      success: true,
      user,
    });

  } catch (err) {
    return res.status(403).json({ message: "INVALID_REFRESH_TOKEN" });
  }
};
