import bcrypt from "bcrypt";
import { redis } from "../../../shared/core/redis/connection";
import { EmailTemplate } from "../../../shared/utils/emailTemplate";
import { HashMechanism } from "../../../shared/utils/hashPassword";
import type { AuthRepository } from "./auth.repository";
import type { IAuth } from "./auth.types";
import { authSchema } from "./auth.validation";

export class AuthService {
  constructor(private repository: AuthRepository) {}
  signup = async (data: IAuth) => {
    await redis.del("auth:all");
    const { error } = authSchema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }

    const findUser = await this.repository.findOne(data);
    if (findUser) {
      throw new Error("User already exist: Please Login");
    }

    const hashPassword = await HashMechanism.hashPassword(data);

    const user = this.repository.signup({
      ...data,
      password: hashPassword,
    });

    const { randomCode, hashedOTP } = await HashMechanism.generateAndHashOTP();
    await redis.set(`OTP:${data?.email}`, hashedOTP, {
      expiration: {
        type: "EX",
        value: 5 * 60,
      },
    });
    await EmailTemplate(data, randomCode);
    return user;
  };

  verifyToken = async (data: IAuth) => {
    if (!data.email) {
      throw new Error("");
    }
    const hashedDataOTP = await redis.get(`OTP:${data.email}`);

    if (!hashedDataOTP) {
      throw new Error("Invalid or expired OTP");
    }
    const isValidOTP = await bcrypt.compare(data.OTP as string, hashedDataOTP);

    if (!isValidOTP) {
      throw new Error("Invalid OTP");
    }

    await redis.del(`OTP:${data.email}`);

    let user = await this.repository.verifyToken(data);
    return user;
  };

  login = async (data: IAuth) => {
    const user = await this.repository.findOne(data);
    if (!user) {
      throw new Error("Invalid User Credential");
    }
    const ok = await bcrypt.compare(data.password, user?.password);
    if (!ok) {
      throw new Error("Invalid Credential");
    }

    return user;
  };
}
