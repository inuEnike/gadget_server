import type { NextFunction, Request, Response } from "express";
import type { CategoryService } from "./category.services";
import { redis } from "../../../shared/core/redis/connection";
import { request } from "node:http";

export class CategoryController {
  private getId(req: Request) {
    return req?.params?.id;
  }
  constructor(private service: CategoryService) {}

  find = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const cachedKey = "category:all";
      const cachedCategory = await redis.get(cachedKey);

      if (cachedCategory) {
        return res.status(200).json({
          success: true,
          source: "redis-cache",
          totalCount: JSON.parse(cachedCategory).length,
          categories: JSON.parse(cachedCategory),
        });
      }

      const categories = await this.service.find();

      await redis.set(cachedKey, JSON.stringify(categories), {
        expiration: {
          type: "EX",
          value: 60 * 5,
        },
      });

      res.status(200).json({
        success: true,
        totalCount: categories.length,
        categories,
      });
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const category = await this.service.create(data);
      await redis.del("category:all");

      res.status(201).json({
        success: true,
        message: "category Created successfully ",
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id = this.getId(req) as string;
      const cacheKey = `category:${id}`;
      const cachedCategory = await redis.get(cacheKey);

      if (cachedCategory) {
        res.status(200).json({
          success: true,
          source: "redis-cache",
          category: JSON.parse(cachedCategory),
        });
      }
      const category = await this.service.findById(id);

      await redis.set(cacheKey, JSON.stringify(category), {
        expiration: {
          type: "EX",
          value: 60 * 5,
        },
      });
      res.status(200).json({
        success: true,
        category,
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
      let id = this.getId(req) as string;
      const data = req.body;

      await redis.del("category:all");
      await redis.del(`category:${id}`);

      const category = await this.service.findByIdAndUpdate(id, data);

      res.status(201).json({
        success: true,
        message: "Category Updated successfully ",
        category,
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
    const id = this.getId(req) as string;

    await redis.del("category:all");
    await redis.del(`category:${id}`);
    const category = await this.service.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category Deleted successfully ",
      category,
    });
  };
}
