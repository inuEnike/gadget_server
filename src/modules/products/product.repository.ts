import type { Model } from "mongoose";
import { Product } from "./product.models";
import type { IProducts } from "./product.types";
import type { Request } from "express";

export class ProductRepository {
  constructor(private model: Model<IProducts>) {}
  find = async () => {
    return await this.model
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "ProductCategory",
        select: "_id name description parentCategory",
        populate: {
          path: "parentCategory",
          select: "_id name description",
        },
      })
      .lean()
      .exec();
  };
  findById = async (id: string) => {
    const product = await this.model.findById(id).populate({
      path: "ProductCategory",
      select: "_id name description parentCategory",
      populate: {
        path: "parentCategory",
        select: "_id name description",
      },
    });
    return product;
  };
  create = async (data: IProducts) => {
    return await this.model.create(data);
  };

  findByIdAndUpdate = async (id: string, data: IProducts) => {
    const product = await this.model.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    return product;
  };
  findByIdAndDelete = async (id: string) => {
    const product = await this.model.findByIdAndDelete(id);
    return product;
  };
}
