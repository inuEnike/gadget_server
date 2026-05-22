import mongoose from "mongoose";
import { ENV } from "../../config/config";

export class Database {
  private dbString() {
    let string =
      ENV.NODE_ENV === "Production" ? ENV.DB_URI_PRODUCTION : ENV.DB_URI;
    return string;
  }
  static async connect() {
    try {
      const connString = new Database();
      let conn = await mongoose.connect(connString.dbString() as string);
      console.log(
        `🦊 Database Connected on ${conn?.connection?.host} successfully`,
      );
      console.log(`🧚🏾‍♀️  Database Name: ${conn?.connection?.db?.databaseName}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Database connection failed:",
          `\nName: ${error?.name}`,
          `\nMessage: ${error?.message}`,
        );
        process.exit(1);
      }
    }
  }
}
