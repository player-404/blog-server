import { createClient } from "redis";

export default class Redis {
  static async connect(url: string) {
    const client = await createClient({
      url,
    })
      .on("error", (err) => {
        console.log("redis连接失败", err);
      })
      .connect();

    console.log("redis已连接");
    return client;
  }
  static async verifyCode(phone: string, code: string) {
    const redis = await Redis.connect(process.env.REDIS_URL as string);
    const redisCode = await redis.get(phone);
    await redis.disconnect();
    return redisCode === code;
  }
  static async setCode(key: string, value: string, EX?: number) {
    const redis = await Redis.connect(process.env.REDIS_URL as string);
    await redis.set(key, value, {
      EX: EX || undefined,
    });
    await redis.disconnect();
  }
}
