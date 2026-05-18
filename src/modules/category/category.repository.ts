import type { Model } from "mongoose";
import type { ICategory } from "./category.types";
export class CategoryRepository {
  constructor(private model: Model<ICategory>) {}

  find = async () => {
    const category = await this.model.find({}).exec();
    return category;
  };
  create = async (data: ICategory) => {
    const category = await this.model.create(data);
    return category;
  };
  findById = async (id: string) => {
    const category = await this.model.findById(id);
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
