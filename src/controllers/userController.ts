import { AppError, catchAsyncError } from "../utils/errorHandle";
import User from "../model/userModel";
import mongoose from "mongoose";

// 获取用户数据
export const getUser = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).populate({
    path: "roles",
    populate: {
      path: "menu",
    },
  });

  if (!user) return next(new AppError(404, "用户不存在"));
  res.status(200).json({
    status: "success",
    message: "用户数据获取成功",
    data: (req as any).user,
  });
});
