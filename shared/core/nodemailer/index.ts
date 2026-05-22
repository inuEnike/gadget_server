import { Connection } from "./connection";
import { RegisterEvent } from "./events";

export const initNodemailer = () => {
  Connection.nodemailer();
  RegisterEvent();
};
