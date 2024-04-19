import { createClient } from "redis";

export default class Redis {
  static redis: any;
  static async connect(url: string) {
    Redis.redis = await createClient({
      url,
    })
      .on("error", (err) => {
        console.log("redis连接失败", err);
      })
      .connect();
    console.log("redis 连接成功");
  }
  static async verifyCode(phone: string, code: string) {
    const redisCode = await Redis.redis.get(phone);
    return redisCode === code;
  }
  static async setCode(key: string, value: string, EX?: number) {
    await Redis.redis.set(key, value, {
      EX: EX || undefined,
    });
  }
  static async getCode(phone: string) {
    return await Redis.redis.get(phone);
  }
  static async disConnect() {
    await Redis.redis.disconnect();
    console.log("redis 连接断开");
  }
}
