import express from "express";
import { ProductController } from "./product.controller";
import { upload } from "../../../shared/utils/upload";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.models";
import { ProductService } from "./product.services";
export const productRouter = express();

const repo = new ProductRepository(Product);
const service = new ProductService(repo);
const controller = new ProductController(service);

productRouter
  .get("/", controller.find)
  .post("/", upload.array("ProductImages"), controller.create)
  .get("/:id", controller.findById)
  .patch("/:id", upload.array("ProductImages"), controller.findByIdAndUpdate)
  .delete("/:id", controller.findByIdAndDelete);
