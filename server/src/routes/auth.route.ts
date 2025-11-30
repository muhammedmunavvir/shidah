import express from "express";
import { googleLogin } from "../controllers/authcontroller";
import { refreshAccessToken } from "../controllers/refreshAccessToken";

const router = express.Router();

router.post("/google", googleLogin);
router.post("/refresh", refreshAccessToken);


export default router;
