import { Router } from "express";
import passport from "passport";
import { googleAuthCallback } from "../controllers/authcontroller.js";

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

export default authrouter;
