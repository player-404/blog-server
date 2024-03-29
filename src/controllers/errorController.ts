import {
  type Errback,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import Redis from "../utils/redis";
import { dbDisConnect } from "../utils/sql";
// 错误处理
const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  Redis.disConnect();
  dbDisConnect();
};

export default errorHandler;
