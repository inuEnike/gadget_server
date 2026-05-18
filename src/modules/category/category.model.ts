import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    description: {
      type: String,
      required: [true, "Category description is required"],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("category", CategoryModel);
