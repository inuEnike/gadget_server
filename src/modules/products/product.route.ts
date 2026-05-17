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

productRouter.get("/", controller.find);
productRouter.post("/", upload.array("ProductImages", 4), controller.create);
productRouter.get("/:id", controller.findById);
productRouter.patch("/:id", controller.findByIdAndUpdate);
productRouter.delete("/:id", controller.findByIdAndDelete);
