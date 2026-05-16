import type { NextFunction, Request, Response } from "express";
import type { IProducts } from "./product.types";
import { ProductService } from "./product.services";
import { redis } from "../../../shared/core/redis/connection";

export class ProductController {
  private getId(req: Request) {
    return req?.params?.id;
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = "product:all";
      const cachedProducts = await redis.get(cacheKey);
      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          source: "redis-cache",
          totalCount: JSON.parse(cachedProducts).length,
          products: JSON.parse(cachedProducts),
        });
      }

      const products = await ProductService.find();

      await redis.set(cacheKey, JSON.stringify(products), {
        expiration: {
          type: "EX",
          value: 60 * 5,
        },
      });

      res.status(200).json({
        success: true,
        totalCount: products.length,
        products,
      });
    } catch (error) {
      next(error);
    }
  }
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const instance = new ProductController();
      let id = instance.getId(req);
      const cacheKey = `product:${id}`;
      const cacheProduct = await redis.get(cacheKey);
      if (cacheProduct) {
        res.status(200).json({
          success: true,
          product: JSON.parse(cacheProduct),
        });
      }

      const product = await ProductService.findById(id as string);

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body;
      const product = await ProductService.create(data);
      res.status(201).json({
        success: true,
        message: "Product Created successfully ",
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async findByIdAndUpdate(id: string, data: IProducts) {}
  static async findByIdAndDelete(id: string) {}
}
