import { catchAsyncError } from "../utils/errorHandle";
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
