import Usermodel from "../models/usermodel";
import { verifyToken } from "../util/jwt";

export const getUserInfo = async (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  try {
    // Decode token to get user ID
    const decoded = verifyToken(token);

    // Fetch full user from DB
    const user = await Usermodel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }

    return res.json({
      success: true,
      user, // FULL user from MongoDB
    });

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TOKEN_EXPIRED" });
    }

    return res.status(403).json({ message: "INVALID_TOKEN" });
  }
};
