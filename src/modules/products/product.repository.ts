import type { Model } from "mongoose";
import { Product } from "./product.models";
import type { IProducts } from "./product.types";

export class ProductRepository {
  constructor(private model: Model<IProducts>) {}
  find = async () => {
    const products = await this.model.find({}).lean().exec();
    return products;
  };
  findById = async (id: string) => {
    const product = await this.model.findById(id);
    return product;
  };
  create = async (data: IProducts) => {
    return await this.model.create(data);
  };
  findByIdAndUpdate = async (id: string, data: IProducts) => {
    const product = await this.model.findByIdAndUpdate(id, data);
    return product;
  };
  findByIdAndDelete = async (id: string) => {
    const product = await this.model.findByIdAndDelete(id);
    return product;
  };
}
