import express from "express";
import { signUp, sendSMS, loginUsername } from "../controllers/authController";
import { getUser, getAllUsers } from "../controllers/userController";
import { loginProject, roleProject } from "../middleware/routerMiddle";
const router = express.Router();

// 注册
router.post("/signUp", signUp);

// 登录
router.post("/signIn", loginUsername);

// 发送验证码
router.post("/sms", sendSMS);

// 获取所有用户数据
router
  .route("/getAllUsers")
  .get(loginProject, roleProject(["superAdmin", "admin"]), getAllUsers);

// 获取用户数据
router.route("/:id").get(loginProject, getUser);

export default router;
