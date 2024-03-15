import mongoose from "mongoose";
export const connectSql = async () => {
  const baseUrl = process.env.SQL_URL;
  if (!baseUrl) throw new Error("url不存在，数据库连接失败！");
  console.log("正在连接数据库...");
  await mongoose.connect(baseUrl);
};
