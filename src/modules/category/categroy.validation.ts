import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  desription: Joi.string().trim().min(2).max(150).required(),
  parentCategory: Joi.string().required(),
});
