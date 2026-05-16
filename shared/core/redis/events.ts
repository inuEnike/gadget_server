import { redis } from "./connection";

export const RegisterEvent = () => {
  redis.on("error", (err) => {
    console.log("Redis Client Error", err);
  });
  redis.on("ready", () => {
    console.log("Redis is connected and is ready to use successfully");
  });

  redis.on("reconnecting", () => {
    console.log("Redis reconnecting...");
  });
};
