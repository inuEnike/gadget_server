import Joi from "joi";
import { ProductRepository } from "./product.repository";
import type { IProducts } from "./product.types";
import { productSchema } from "./product.validation";

export class ProductService {
  constructor(private repository: ProductRepository) {}
  find = async () => {
    const products = await this.repository.find();
    return products;
  };
  findById = async (id: string) => {
    if (!id) {
      throw new Error("No ID found: ID required");
    }
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error("No Product with the id found");
    }
    return product;
  };
  create = async (data: IProducts) => {
    const { error } = productSchema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }
    const product = await this.repository.create(data);
    return product;
  };
  findByIdAndUpdate = async (id: string, data: IProducts) => {
    if (!id) {
      throw new Error("The Id is required");
    }
    const product = await this.repository.findByIdAndUpdate(id, data);
    if (!product) {
      throw new Error("No Product with the id found");
    }
    return product;
  };
  findByIdAndDelete = async (id: string) => {
    if (!id) {
      throw new Error("The Id is required");
    }
    const product = await this.repository.findByIdAndDelete(id);
    if (!product) {
      throw new Error("No Product with the id found");
    }
    return product;
  };
}
