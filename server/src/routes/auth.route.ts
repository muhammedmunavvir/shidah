import express from "express";
import { googleLogin } from "../controllers/authcontroller";
import { refreshAccessToken } from "../controllers/refreshAccessToken";
import { getUserInfo } from "../controllers/userInfo";

const router = express.Router();

router.post("/google", googleLogin);
router.post("/refresh", refreshAccessToken);
router.get("/userInfo",getUserInfo)


export default router;
