import express from "express";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { Category } from "./category.model";
import { CategoryService } from "./category.services";
export const categoryRouter = express.Router();

const repository = new CategoryRepository(Category);
const service = new CategoryService(repository);
const controller = new CategoryController(service);

categoryRouter
  .get("/", controller.find)
  .get("/:id", controller.findById)
  .post("/", controller.create)
  .patch("/:id", controller.findByIdAndUpdate)
  .delete("/:id", controller.findByIdAndDelete);
