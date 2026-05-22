import { InitDb } from "../database";
import { initNodemailer } from "../nodemailer";
import { InitRedis } from "../redis";

export class Bootstrap {
  static async initialize() {
    await InitDb();
    await InitRedis();
    await initNodemailer()
  }
}
