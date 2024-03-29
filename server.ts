import "dotenv/config";
import app from "./src/app";
import { connectSql, dbDisConnect } from "./src/utils/sql";
import Redis from "./src/utils/redis";

// node 意外错误捕获
// 捕获未知错误
process.on("uncaughtException", (err) => {
  console.log("发现错误", err);
  Redis.disConnect();
  dbDisConnect();
  process.exit(1);
});
// 捕获 reject错误
process.on("unhandledRejection", (err) => {
  console.log("发现错误", err);
  Redis.disConnect();
  dbDisConnect();
  process.exit(1);
});

// 接收到进程关闭信号
process.on("SIGINT", () => {
  Redis.disConnect();
  dbDisConnect();
  process.exit(0);
});
// 进程已退出
process.on("exit", () => {
  console.log("程序退出");
});

// 数据库连接
connectSql()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

// redis连接
Redis.connect(process.env.REDIS_URL as string);

// 监听端口
app.listen(process.env.PORT as unknown as number, "localhost", () => {
  console.log(
    "服务已启动：http://localhost:" + (process.env.PORT as unknown as number),
  );
});
