import { Database } from "./connection";
import { RegisterEvents } from "./events";

export const InitDb = async () => {
  await Database.connect();
  RegisterEvents();
};
