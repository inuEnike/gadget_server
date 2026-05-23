import type { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { createSession } from "../../../shared/config/session";
import type { AuthRepository } from "./auth.repository";
import { redis } from "../../../shared/core/redis/connection";

export class authController {
  constructor(
    private service: AuthService,
    private repo: AuthRepository,
  ) {}

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (!data) {
      throw new Error("Please input all fields");
    }
    const user = await this.service.signup(data);
    return res.status(200).json({
      success: true,
      message: "User signed up successfully",
      user,
    });
  };
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const user = await this.service.verifyToken(data);

      res.status(200).json({
        success: true,
        message: "Confirmation Successful, you can now login",
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = req.body;
      if (!data || !data.email || !data.password) {
        throw new Error("Please input all fields");
      }
      const user = await this.service.login(data);
      const sessionId = await createSession(user.id.toString());
      res.cookie("sid", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "logged in",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.userId;

      if (!id) {
        throw new Error("An error occured");
      }

      const user = await this.repo.getMe(id);

      if (!user) {
        throw new Error("User not found");
      }

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = req.cookies?.sid;

      // If the cookie isn't even there, just clear it anyway and exit early
      if (!sessionId) {
        res.clearCookie("sid");
        return res.status(200).json({ message: "No active session found." });
      }

      // 1. Hard-delete the key from Redis memory instantly
      const redisKey = `sessionID:${sessionId}`;
      await redis.del(redisKey);

      // 2. Clear the browser cookie with matching security flags
      res.clearCookie("sid", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return res.status(200).json({
        status: "success",
        message: "Session terminated successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}
