import express from "express";
import { createRole, deleteRole } from "../controllers/roleController";

const router = express.Router();
// 角色创建
router.post("/", createRole);

router.route("/:id").delete(deleteRole);


export default router;
