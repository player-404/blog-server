import express from "express";
import cors from "cors";
import { type CorsOptions } from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import RoleRouter from "./routes/roleRouter";
import menuRouter from "./routes/menuRouter";
import errorHandler from "./controllers/errorController";

const app = express();

// 将数据放入req.body中
app.use(express.json());
// 中间件使用:
//  HTTP请求日志
app.use(morgan("combined"));

// 跨域处理
const whitelist = ["http://localhost:5173"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin as string) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("跨域请求，拒绝访问！"));
    }
  },
};

// app.use(cors(corsOptions));

// 跨域处理
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  );
  // 允许跨域携带cookie
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// 路由
app.use("/v1/api/user", userRouter);
app.use("/v1/api/role", RoleRouter);
app.use("/v1/api/menu", menuRouter);

// 404处理
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// 错误处理
app.use(errorHandler);

export default app;
