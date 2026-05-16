import mongoose from "mongoose";
import { ENV } from "../../config/config";

export class Database {
  private dbString() {
    let string = ENV.DB_URI as string;
    return string;
  }
  static async connect() {
    try {
      const connString = new Database();
      let conn = await mongoose.connect(connString.dbString());
      console.log(
        `🦊 Database Connected on ${conn?.connection?.host} successfully`,
      );
      console.log(`🧚🏾‍♀️  Database Name: ${conn?.connection?.db?.databaseName}`);
    } catch (error: any) {
      console.error(
        "Database connection failed:",
        `\nName: ${error?.name}`,
        `\nMessage: ${error?.message}`,
      );
      process.exit(1);
    }
  }
}
