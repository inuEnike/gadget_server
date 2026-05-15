import { Product } from "./product.models";
import type { IProducts } from "./product.types";

export class ProductRepository {
  static async find() {
    const products = await Product.find().lean().exec();
    return products;
  }
  static async findById(id: string) {
    const product = await Product.findById(id);
    return product;
  }
  static async create(data: IProducts) {
    const product = new Product(data);
    return await product.save();
  }
  static async findByIdAndUpdate(id: string, data: IProducts) {
    const product = await Product.findByIdAndUpdate(id, data);
    return product;
  }
  static async findByIdAndDelete(id: string) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}
