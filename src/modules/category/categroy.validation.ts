import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().trim().min(2).max(150),
  parentCategory: Joi.string(),
});
