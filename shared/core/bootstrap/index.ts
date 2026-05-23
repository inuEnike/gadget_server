import { InitDb } from "../database";
import { InitNodemailer } from "../nodemailer";
import { InitRedis } from "../redis";

export class Bootstrap {
  static async initialize() {
    await InitDb();
    await InitRedis();
    InitNodemailer();
  }
}
