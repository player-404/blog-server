import { catchAsyncError } from "../utils/errorHandle";
import { AppError } from "../utils/errorHandle";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import { Role } from "../utils/role";

// 登录保护
export const loginProject = catchAsyncError(async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("token", token);
  // 没有 token
  if (!token) return next(new AppError(401, "未登录"));

  const decode = await jwt.verify(token, process.env.JWT_SECRET as string);
  // 用户不存在
  if (!decode) return next(new AppError(401, "身份验证失败,请重新登录"));
  const { id } = decode as { id: string };
  const user = await User.findById(id).populate({
    path: "roles",
    populate: {
      path: "menu",
    },
  });
  if (!user) return next(new AppError(401, "身份过期,请重新登录"));
  // 身份验证成功
  (req as any).user = user;
  next();
});

// 角色权限保护
export const roleProject = (roles: string[]) =>
  catchAsyncError(async (req, res, next) => {
    if (!roles) return next();
    const role = new Role();
    const status = (req as any).user
      ? role.getRoles((req as any).user.roles).checkRoles(roles)
      : false;
    if (!status) return next(new AppError(403, "权限不足"));
    next();
  });
