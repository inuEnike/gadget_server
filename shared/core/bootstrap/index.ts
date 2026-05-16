import { InitDb } from "../database";
import { InitRedis } from "../redis";

export class Bootstrap {
  static async initialize() {
    await InitDb();
    await InitRedis();
  }
}
