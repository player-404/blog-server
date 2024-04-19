import express from "express";
import {
  createRole,
  deleteRole,
  updateRole,
  getAllRoles,
} from "../controllers/roleController";
import { loginProject, roleProject } from "../middleware/routerMiddle";

const router = express.Router();
// 角色创建
router
  .post("/", loginProject, roleProject(["superAdmin"]), createRole)
  .get("/", loginProject, roleProject(["superAdmin"]), getAllRoles);

router
  .route("/:id")
  .delete(loginProject, roleProject(["superAdmin"]), deleteRole)
  .patch(loginProject, roleProject(["admin", "superAdmin"]), updateRole);

export default router;
