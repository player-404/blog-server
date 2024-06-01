import { AppError, catchAsyncError } from "../utils/errorHandle";
import PerMenu from "../model/perMenuModel";

// 创建菜单
export const createMenu = catchAsyncError(async (req, res) => {
  const { name, icon, path, level, desc, parent } = req.body;
  const menu = await PerMenu.create({ name, icon, path, level, desc, parent });
  res.status(200).json({
    msg: "创建菜单成功",
    menu,
  });
});

// 删除菜单
export const deleteMenu = catchAsyncError(async (req, res) => {
  const menu = await PerMenu.findByIdAndDelete(req.params.id);
  if (!menu) {
    return res.status(400).json({ msg: "菜单不存在" });
  }

  res.status(200).json({
    msg: "删除菜单成功",
    menu,
  });
});

// 获取所有菜单
export const getAllMenus = catchAsyncError(async (req, res, next) => {
  const menus = await PerMenu.find();
  if (!menus) return next(new AppError(500, "数据获取失败，请稍后重试"));
  res.status(200).json({
    msg: "获取所有菜单成功",
    menus,
  });
});

// 获取用户菜单
export const getUserMenus = catchAsyncError(async (req, res, next) => {
  const user = (req as any).user;
  res.status(200).json({
    msg: "获取用户菜单成功",
    data: {
      menus: user.roles[0].menu,
    },
  });
});
