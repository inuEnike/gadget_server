import type { IAuth } from "../../src/modules/auth/auth.types";
import { ENV } from "../config/config";
import { Connection } from "../core/nodemailer/connection";

export const EmailTemplate = async (data: IAuth, otp: string) => {
  const conn = Connection.nodemailer();
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #111;">Email Verification</h2>

      <p>Hello, ${data.fullName}</p>

      <p>Use the OTP below to verify your account:</p>

      <div style="
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 6px;
        background: #f4f4f4;
        padding: 10px 15px;
        display: inline-block;
        margin: 10px 0;
      ">
        ${otp}
      </div>

      <p>This code expires in <b>5 minutes</b>.</p>

      <p>If you did not request this, ignore this email.</p>

      <hr />

      <small style="color: #666;">
        Icy Gadgets Store Security Team
      </small>
    </div>
  `;

  const info = conn.sendMail({
    from: ENV.NODEMAILER_USER,
    to: data.email,
    subject: "Verify your email (OTP)",
    html,
  });
  return info;
};
