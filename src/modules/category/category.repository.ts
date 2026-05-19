import type { Model } from "mongoose";
import type { ICategory } from "./category.types";
export class CategoryRepository {
  constructor(private model: Model<ICategory>) {}

  find = async () => {
    const category = await this.model
      .find()
      .populate({
        path: "parentCategory",
        select: "_id name description",
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return category;
  };
  create = async (data: ICategory) => {
    const category = await this.model.create(data);
    return category;
  };
  findById = async (id: string) => {
    const category = await this.model.findById(id).populate({
      path: "parentCategory",
      select: "_id name description",
    });
    return category;
  };
  findByIdAndUpdate = async (id: string, data: ICategory) => {
    const category = await this.model.findByIdAndUpdate(id, data);
    return category;
  };
  findByIdAndDelete = async (id: string) => {
    const category = await this.model.findByIdAndDelete(id);
    return category;
  };
}
