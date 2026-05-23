import { Connection } from "./connection";
import { RegisterEvent } from "./events";

export const InitNodemailer = () => {
  Connection.nodemailer();
  RegisterEvent();
};
