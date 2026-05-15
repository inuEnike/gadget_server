import { ProductRepository } from "./product.repository";
import type { IProducts } from "./product.types";
import { ProductValidation } from "./product.validation";

export class ProductService {
  static async find() {
    const products = await ProductRepository.find();
    return products;
  }
  static async findById(id: string) {
    if (!id) {
      throw new Error("No ID found: ID required");
    }
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new Error("No Product with the id found");
    }
    return product;
  }
  static async create(data: IProducts) {
    ProductValidation(data);
    const product = ProductRepository.create(data);
    return product;
    
  }
  static async findByIdAndUpdate(id: string) {}
  static async findByIdAndDelete(id: string) {}
}
