import express from "express";
import { googleLogin } from "../controllers/authcontroller";
import { refreshAccessToken } from "../controllers/refreshAccessToken";
import { getUserInfo } from "../controllers/userInfo";
import { Logoutcontroller } from "../controllers/logut";

const router = express.Router();

router.post("/google", googleLogin);
router.post("/refresh", refreshAccessToken);
router.get("/userInfo",getUserInfo)
router.post("/logout",Logoutcontroller)


export default router;
