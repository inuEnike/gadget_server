import Joi from "joi";

export const productSchema = Joi.object({
  ProductName: Joi.string().trim().min(2).max(150).required(),

  ProductDesc: Joi.string().trim().min(10).required(),

  ProductBrand: Joi.string().trim().min(2).max(100).required(),

  ProductRatings: Joi.number().min(0).max(5).default(0),

  ProductReviews: Joi.string().allow("", null),

  ProductPrice: Joi.number().positive().required(),
  ProductCategory: Joi.string().required(),

  ProductImages: Joi.array().items(Joi.string().uri()).min(1).optional(),

  ProductVariants: Joi.string().allow("", null),

  ProductWarrantyDuration: Joi.number().integer().min(0).required(),
});
