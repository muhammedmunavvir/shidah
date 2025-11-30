import { generateToken, verifyToken } from "../util/jwt";
import { Request,Response } from "express";
export const refreshAccessToken = (req:Request, res:Response) => {
    console.log("refresh token triggerd")
    
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken,"refrsh token")

  if (!refreshToken) {
    return res.status(401).json({ message: "NO_REFRESH_TOKEN" });
  }

  try {
    // Verify refresh token (only contains user id)
    const decoded = verifyToken(refreshToken);

    const isProduction = process.env.NODE_ENV === "production";

    // Generate new access token
    const newAccessToken = generateToken(
      { id: decoded.id },
      "15m"
    );

    res.cookie("auth_token", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 60 * 1000, // 15 min
    });

    return res.json({ success: true });

  } catch (err) {
    return res.status(403).json({ message: "INVALID_REFRESH_TOKEN" });
  }
};