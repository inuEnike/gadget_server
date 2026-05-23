import { Auth } from "./auth.model";
import type { Model } from "mongoose";
import type { IAuth } from "./auth.types";

export class AuthRepository {
  constructor(private model: Model<IAuth>) {}
  findOne = async (data: IAuth) => {
    return await this.model.findOne({ email: data.email });
  };
  signup = async (data: IAuth) => {
    const user = new this.model(data);
    await user.save();

    return { user };
  };

  verifyToken = async (data: IAuth) => {
    let updatedUser = await this.model
      .findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            isVerified: true,
          },
        },
        { returnDocument: "after" },
      )
      .lean();
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return { updatedUser };
  };

  signin = async () => {};

  getMe = async (id: string) => {
    return this.model.findById(id);
  };
}
