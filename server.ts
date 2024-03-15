import "dotenv/config";
import app from "./src/app";
import { connectSql } from "./src/utils/sql";

// 数据库连接
connectSql()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败", err);
  });

// 监听端口
app.listen(3000, () => {
  console.log("server is running");
});
