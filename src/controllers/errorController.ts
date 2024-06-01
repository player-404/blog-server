import { type NextFunction, type Request, type Response } from "express";
import { AppError } from "../utils/errorHandle";

const devErrorHandle = async (err: any, res: Response) => {
  console.log("err", err);
  res.status(500).json({
    err,
  });
};

const prdErrorHandle = async (err: any, res: Response) => {
  if (!err.operateCapture) {
    res.status(500).json({
      status: err.status,
      msg: "发生意外错误，请联系开发者",
    });
    return;
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// 生产环境错误处理
// required 错误处理
const validateHandle = (err: any) => {
  const keys = Object.keys(err.errors).join(",");
  const message = `${keys} 验证失败`;
  return new AppError(401, message);
};
// 重复key错误处理
const duplicateHandle = (err: any) => {
  console.log("err", err);
  const keysTable: Record<string, string> = {
    phone: "手机号",
    email: "邮箱",
    name: "用户名",
  };
  const keys = Object.keys(err.keyValue).join(",");
  const message = `${keysTable[keys] ?? keys}已存在`;
  return new AppError(401, message);
};
// 错误处理
const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "请求失败";
  err.message = err.message || "发生错误";
  // 处理生产环境错误
  if ((process.env.NODE_ENV as string).trim() === "production") {
    if (err.name === "ValidationError") {
      err = validateHandle(err);
    }
    if (err.code === 11000) {
      err = duplicateHandle(err);
    }
    await prdErrorHandle(err, res);
  }
  // 处理开发环境错误
  if ((process.env.NODE_ENV as string).trim() === "development") {
    await devErrorHandle(err, res);
  }
};

export default errorHandler;
