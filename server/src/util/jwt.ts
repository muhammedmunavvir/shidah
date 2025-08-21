import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { JwtPayload } from "../types/auth.type.js";
import dotenv from "dotenv";
import type { StringValue } from "ms"; 
dotenv.config();

// Secret type
const getJwtSecret = (): Secret => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }
  return process.env.JWT_SECRET;
};

// Explicitly type expiresIn as ms.StringValue
export const generateToken = (
  payload: JwtPayload,
  expiresIn: StringValue = "7d"
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, getJwtSecret(), options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
