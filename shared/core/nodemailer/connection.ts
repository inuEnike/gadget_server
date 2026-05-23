import nodemailer from "nodemailer";
import { ENV } from "../../config/config";
export class Connection {
  static nodemailer() {
    return nodemailer.createTransport({
      host: ENV.NODEMAILER_HOST as string,
      port: Number(ENV.NODEMAILER_PORT),
      secure: true,
      auth: {
        user: ENV.NODEMAILER_USER,
        pass: ENV.NODEMAILER_PASS,
      },
    });
  }
}
