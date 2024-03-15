import express from "express";
import { signUp, sendSMS } from "../controllers/authController";
const router = express.Router();

// 注册
router.post("/signUp", signUp);

// 发送验证码
router.get("/sms", sendSMS);

export default router;
