import express from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
  getUserMenus,
} from "../controllers/menuController";
import { loginProject, roleProject } from "../middleware/routerMiddle";

const router = express.Router();

// 创建菜单路由 & 获取所有菜单路由
router
  .route("/")
  .post(loginProject, roleProject(["admin", "superAdmin"]), createMenu)
  .get(loginProject, roleProject(["superAdmin"]), getAllMenus);

// 删除菜单路由
router
  .route("/:id")
  .delete(loginProject, roleProject(["admin", "superAdmin"]), deleteMenu);

// 获取用户路由
router.route("/getMenusByUser").get(loginProject, getUserMenus);

export default router;
