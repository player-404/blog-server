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
}
