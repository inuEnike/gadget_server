import type { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.services";
import { redis } from "../../../shared/core/redis/connection";
import { uploadToCloudinary } from "../../../shared/utils/uploadToCloudinary";

export class ProductController {
  private getId(req: Request) {
    return req?.params?.id;
  }
  constructor(private service: ProductService) {}

  find = async (_: Request, res: Response, next: NextFunction) => {
    try {
      // getting the cache key
      const cacheKey = "products:all";
      //   using the cache key to get the cacehd products
      const cachedProducts = await redis.get(cacheKey);

      // if there's products in the cache
      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          source: "redis-cache",
          totalCount: JSON.parse(cachedProducts).length,
          products: JSON.parse(cachedProducts),
        });
      }

      // fetch the product from the database
      const products = await this.service.find();

      /**
       * If there's no cache product
       * set the product to the redis cache
       *
       */
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
  };
  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id = this.getId(req);
      const cacheKey = `products:${id}`;
      const cacheProduct = await redis.get(cacheKey);
      if (cacheProduct) {
        res.status(200).json({
          success: true,
          product: JSON.parse(cacheProduct),
        });
      }

      const product = await this.service.findById(id as string);

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  };
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No images provided",
        });
      }
      let imageUrls: string[] = [];

      if (files && files.length > 0) {
        const uploadPromises = files.map((file) => uploadToCloudinary(file));

        imageUrls = await Promise.all(uploadPromises);
      }

      const data = {
        ...req.body,
        ProductImages: imageUrls,
      };

      const product = await this.service.create(data);
      await redis.del("products:all");
      res.status(201).json({
        success: true,
        message: "Product Created successfully ",
        product,
      });
    } catch (error) {
      next(error);
    }
  };
  findByIdAndUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      let data = req.body;
      let id = this.getId(req);
      const product = await this.service.findByIdAndUpdate(id as string, data);

      await redis.del("products:all");
      await redis.del(`products:${id}`);

      res.status(201).json({
        success: true,
        message: "Product Updated successfully ",
        product,
      });
    } catch (error) {
      next(error);
    }
  };

  findByIdAndDelete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = this.getId(req);
      const product = await this.service.findByIdAndDelete(id as string);

      await redis.del("products:all");
      await redis.del(`products:${id}`);

      res.status(200).json({
        success: true,
        message: "Product Deleted successfully ",
        product,
      });
    } catch (error) {
      next(error);
    }
  };
}
