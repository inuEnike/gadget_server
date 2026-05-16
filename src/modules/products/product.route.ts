import express from "express";
import { ProductController } from "./product.controller";
export const productRouter = express();

productRouter.get("/", ProductController.find);
productRouter.post("/", ProductController.create);
productRouter.get("/:id", ProductController.findById);
productRouter.patch("/:id", ProductController.findByIdAndUpdate);
productRouter.delete("/:id", ProductController.findByIdAndDelete);
