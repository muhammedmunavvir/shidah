import express from "express";
import { googleLogin } from "../controllers/authcontroller";

const router = express.Router();

router.post("/google", googleLogin);
// router.get("/me", jwtverification, (req, res) => {
//   res.json({ user: req.user });
// });

export default router;
