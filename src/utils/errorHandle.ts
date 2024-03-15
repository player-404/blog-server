import { type Request, type Response, type NextFunction } from "express";

export const catchAsyncError =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

export class AppError extends Error {
  statusCode: number;
  message: string;
  status: string;
  operateCapture: boolean;
  constructor(code: number, message: string) {
    super();
    this.statusCode = code;
    this.message = message;
    this.status = `${this.statusCode}`.startsWith("4")
      ? "请求失败"
      : "请求错误";
    this.operateCapture = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
