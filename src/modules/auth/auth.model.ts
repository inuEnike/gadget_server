import mongoose from "mongoose";
import { AuthRoles, type IAuth } from "./auth.types";

const AuthSchema = new mongoose.Schema<IAuth>({
  fullName: {
    type: String,
    required: [true, "The Full Name field is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The email part is required"],
  },
  password: {
    type: String,
    required: [true, "The password field is required"],
  },
  role: {
    type: String,
    enum: Object.values(AuthRoles),
    default: AuthRoles.User,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const Auth = mongoose.model<IAuth>("auth", AuthSchema);
