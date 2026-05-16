import { createClient } from "redis";


export let redis: ReturnType<typeof createClient>;
export class Redis {
  static async connect() {
    redis = createClient();

    redis.on("connect", () => {
      console.log("====================================");
      console.log("Redis connected");
      console.log("====================================");
    });
    await redis.connect();

    return redis;
  }
}
