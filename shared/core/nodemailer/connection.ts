import nodemailer from "nodemailer";
import { ENV } from "../../config/config";
export class Connection {
  static nodemailer() {
    const transporter = nodemailer.createTransport({
      service: ENV.NODEMAILER_SERVICE as string,
      auth: {
        user: ENV.NODEMAILER_USER,
        pass: ENV.NODEMAILER_PASS,
      },
    });
    return transporter;
  }
}
