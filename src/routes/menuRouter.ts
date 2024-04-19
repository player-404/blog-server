import express from "express";
import {
  createMenu,
  deleteMenu,
  getAllMenus,
} from "../controllers/menuController";
import { loginProject, roleProject } from "../middleware/routerMiddle";

const router = express.Router();

router
  .route("/")
  .post(loginProject, roleProject(["admin", "superAdmin"]), createMenu)
  .get(loginProject, roleProject(["superAdmin"]), getAllMenus);

router
  .route("/:id")
  .delete(loginProject, roleProject(["admin", "superAdmin"]), deleteMenu);

export default router;
