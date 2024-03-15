import {
  type Errback,
  type Request,
  type Response,
  type NextFunction,
} from "express";
// 错误处理
const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
};

export default errorHandler;
