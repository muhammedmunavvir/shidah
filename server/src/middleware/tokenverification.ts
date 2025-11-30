import { verifyToken } from "../util/jwt";

export const jwtverification = (req, res, next) => {
const token = req.cookies.auth_token; 
console.log("jwt middleware hit:", token);

  if (!token) return res.status(401).json({ message: "NO_TOKEN" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TOKEN_EXPIRED" });
    }
    return res.status(403).json({ message: "INVALID_TOKEN" });
  }
};
