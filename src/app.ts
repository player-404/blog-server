import express from "express";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import errorHandler from "./controllers/errorController";
const app = express();

// 将数据放入req.body中
app.use(express.json());
// 中间件使用:
//  HTTP请求日志
app.use(morgan("combined"));

// 路由
app.use("/v1/api/user", userRouter);

// 404处理
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// 错误处理
app.use(errorHandler);

export default app;
