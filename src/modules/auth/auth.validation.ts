import { password } from "bun";
import Joi from "joi";

export const authSchema = Joi.object({
  fullName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
  password_confirmation: Joi.any().valid(Joi.ref("password")).required(),
  phoneNo: Joi.string().required(),
});
