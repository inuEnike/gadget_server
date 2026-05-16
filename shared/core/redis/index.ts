import { Redis } from "./connection";
import { RegisterEvent } from "./events";

export const InitRedis = async () => {
  await Redis.connect();
  RegisterEvent();
};
