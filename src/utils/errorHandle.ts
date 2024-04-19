import { type NextFunction, type Request, type Response } from "express";
export const catchAsyncError =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction,
      roles?: string[],
    ) => any,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => {
      next(err);
    });
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
    this.status = `${this.statusCode}`.startsWith("5")
      ? "发生错误"
      : "请求失败";
    this.operateCapture = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
