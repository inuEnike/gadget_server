import mongoose from "mongoose";
import type { IProducts } from "./product.types";

const ProductModel = new mongoose.Schema<IProducts>(
  {
    ProductName: {
      type: String,
      required: [true, "The product name is required"],
    },
    ProductDesc: {
      type: String,
      required: [true, "The product description is required"],
    },
    ProductBrand: {
      type: String,
      required: [true, "The product brand is required"],
    },
    ProductRatings: {
      type: Number,
      default: 0.0,
    },
    ProductReviews: {
      type: String,
    },
    ProductPrice: {
      type: Number,
      required: [true, "The product price is required"],
    },

    ProductImages: {
      type: [String],
    },
    ProductVariants: {
      type: String,
    },
    ProductWarrantyDuration: {
      type: Number,
      required: [true, "The product warranty duration is required"],
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("product", ProductModel);
