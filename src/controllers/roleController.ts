import { AppError, catchAsyncError } from "../utils/errorHandle";
import Role from "../model/roleModel";

// 创建角色
export const createRole = catchAsyncError(async (req, res) => {
  const role = await Role.create(req.body);

  res.status(200).json({
    msg: "角色创建成功",
    role: role,
  });
});

// 删除角色
export const deleteRole = catchAsyncError(async (req, res) => {
  const role = await Role.findByIdAndDelete(req.params.id);

  res.status(200).json({
    msg: "角色删除成功",
    role: role,
  });
});

// 更新角色信息
export const updateRole = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const role = await Role.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    msg: "数据更新成功",
    role: role,
  });
});

// 获取所有角色信息
export const getAllRoles = catchAsyncError(async (req, res, next) => {
  const roles = await Role.find();
  if (!roles) return next(new AppError(500, "数据获取失败，请稍后重试"));
  res.status(200).json({
    msg: "数据获取成功",
    roles: roles,
  });
});
