import { CategoryRepository } from "./category.repository";
import type { ICategory } from "./category.types";
import { categorySchema } from "./categroy.validation";

export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  find = async () => {
    const category = await this.repository.find();
    if (!category) {
      throw new Error("No Category found");
    }
    return category;
  };
  create = async (data: ICategory) => {
    const { error } = categorySchema.validate(data);
    if (error) {
      throw new Error(error?.message);
    }
    const category = await this.repository.create(data);
    return category;
  };
  findById = async (id: string) => {
    if (!id) {
      throw new Error("ID is required");
    }
    const category = await this.repository.findById(id);
    if (!category) {
      throw new Error(`No category with the id of ${id} found`);
    }
    return category;
  };
  findByIdAndUpdate = async (id: string, data: ICategory) => {
    if (!id) {
      throw new Error("ID is required");
    }
    const category = await this.repository.findByIdAndUpdate(id, data);
    if (!category) {
      throw new Error(`No category with the id of ${id} found`);
    }
    return category;
  };

  findByIdAndUpdateAndDelete = async (id: string) => {
    if (!id) {
      throw new Error("ID is required");
    }
    const category = await this.repository.findByIdAndDelete(id);
    if (!category) {
      throw new Error(`No category with the id of ${id} found`);
    }
    return category;
  };
}
