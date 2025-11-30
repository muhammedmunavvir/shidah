import { verifyToken } from "../util/jwt";

export const getUserInfo = (req, res) => {
  const accessToken = req.cookies.auth_token;

  if (!accessToken) {
    return res.status(401).json({ message: "NO_TOKEN" });
  }

  try {
    const decoded = verifyToken(accessToken);

    return res.json({
      success: true,
      user: decoded,   // id, email, role
    });

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TOKEN_EXPIRED" });
    }

    return res.status(403).json({ message: "INVALID_TOKEN" });
  }
};
