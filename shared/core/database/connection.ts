import mongoose from "mongoose";
import { ENV } from "../../config/config";

export class Database {
  static async connect() {
    try {
      let DbConnectionString = ENV.DB_URI as string;
      let conn = await mongoose.connect(DbConnectionString);
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
