import mongoose from "mongoose";
import type { Server } from "node:http";

export class GracefullyShutDown {
  static initialize(server: Server) {
    const shutdown = async () => {
      console.log("\nGracefully shutting down all running process...");

      // close server
      server.close(() => {
        console.log("HTTP server closed...");
      });

      // close mongodb
      await mongoose.connection.close();

      console.log("MongoDB disconnected successfully");

      console.log("Successfully shut down all processes");
      process.exit(0);
    };

    process.on("SIGINT", shutdown);

    process.on("SIGTERM", shutdown);
  }
}
