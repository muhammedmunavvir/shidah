import express from "express";
import { googleLogin } from "../controllers/authcontroller";

const router = express.Router();

router.post("/google/callback", googleLogin);
// router.get("/me", jwtverification, (req, res) => {
//   res.json({ user: req.user });
// });

export default router;
