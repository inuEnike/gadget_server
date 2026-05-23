import bcrypt from "bcrypt";
import type { IAuth } from "../../src/modules/auth/auth.types";

export class HashMechanism {
  static async hashPassword(data: IAuth) {
    const salt = 10;
    const hash = await bcrypt.hash(data.password, salt);

    return hash;
  }

  static async generateAndHashOTP() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";

    let randomCode = "";

    for (let i = 0; i < 6; i++) {
      randomCode += characters[Math.floor(Math.random() * characters.length)];
    }

    let hashedOTP = await bcrypt.hash(randomCode, 10);
    return {randomCode ,hashedOTP};
  }
}
