import express from "express";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { Category } from "./category.model";
import { CategoryService } from "./category.services";
import {
  adminMiddleware,
  authMiddleware,
} from "../../../shared/middlewares/auth.middleware";
export const categoryRouter = express.Router();

const repository = new CategoryRepository(Category);
const service = new CategoryService(repository);
const controller = new CategoryController(service);

categoryRouter
  .get("/", controller.find)
  .get("/:id", controller.findById)
  .post("/", authMiddleware, adminMiddleware, controller.create)
  .patch("/:id", authMiddleware, adminMiddleware, controller.findByIdAndUpdate)
  .delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    controller.findByIdAndDelete,
  );
