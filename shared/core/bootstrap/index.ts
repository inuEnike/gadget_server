import { InitDb } from "../database";

export class Bootstrap {
  static async initialize() {
    await InitDb();
  }
}
