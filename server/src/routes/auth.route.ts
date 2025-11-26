import { Router } from "express";
import passport from "passport";
import { getMe, googleAuthCallback } from "../controllers/authcontroller.js";
import { jwtverification } from "../middleware/tokenverification.js";

const authrouter = Router();

// Redirect to Google for authentication
authrouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
authrouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleAuthCallback
);

authrouter.get("/me", jwtverification, getMe);

export default authrouter;
