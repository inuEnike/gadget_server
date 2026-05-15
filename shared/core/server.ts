import { ENV } from "../config/config";
import { app } from "../../app";
import { GracefullyShutDown } from "./gracefully-shutdown";
import { Bootstrap } from "./bootstrap";

const PORT = ENV.PORT;

const startServer = async () => {
  await Bootstrap.initialize();

  let server;
  server = app.listen(PORT, async () => {
    console.log("====================================");
    console.log(`💥 Server running on port ${PORT}`);
    console.log("====================================");
  });

  GracefullyShutDown.initialize(server);

  server.on("error", (err: Error) => {
    console.error("Server error:", err.message);
  });
};

startServer();
