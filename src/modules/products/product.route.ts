import express from "express";
import { ProductController } from "./product.controller";
import { upload } from "../../../shared/utils/upload";
export const productRouter = express();

productRouter.get("/", ProductController.find);
productRouter.post("/", upload.array("images", 4), ProductController.create);
productRouter.get("/:id", ProductController.findById);
productRouter.patch("/:id", ProductController.findByIdAndUpdate);
productRouter.delete("/:id", ProductController.findByIdAndDelete);
