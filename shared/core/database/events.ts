import mongoose from "mongoose";

export const RegisterEvents = () => {
  // let's handle connection events
  mongoose.connection.on("error", (err) => {
    throw new Error(`Mongodb connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB has been disconnected....");
  });
};
