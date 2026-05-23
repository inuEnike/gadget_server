import "express";
import type { NextFunction, Request, Response } from "express";
import { redis } from "../core/redis/connection";
import { Auth } from "../../src/modules/auth/auth.model";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // extract da cookie
    const sessionId = req.cookies.sid;

    if (!sessionId) {
      throw new Error("Not Authenticated: Please Login");
    }

    //  check your session id in redis
    const userId = await redis.get(`sessionID:${sessionId}`);
    if (!userId) {
      throw new Error("Session expired, please log in again");
    }

    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};

export const adminMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  try {
    const id = req.userId;
    if (!id) {
      throw new Error("Unauthorized user");
    }
    const user = await Auth.findById(id);
    if (!user || !(user.role === "admin")) {
      throw new Error("Forbidden: Admin privileges required");
    }
    next();
  } catch (error) {
    next(error);
  }
};
