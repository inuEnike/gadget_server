import express from "express";
import { AuthRepository } from "./auth.repository";
import { Auth } from "./auth.model";
import { AuthService } from "./auth.service";
import { authController } from "./auth.controller";
import {
  adminMiddleware,
  authMiddleware,
} from "../../../shared/middlewares/auth.middleware";
export const AuthRouter = express();
const repository = new AuthRepository(Auth);
const service = new AuthService(repository);

const controller = new authController(service, repository);
AuthRouter.post("/register", controller.signup)
  .post("/verify", controller.verifyToken)
  .post("/login", controller.login)
  .get("/me", authMiddleware, adminMiddleware, controller.getMe)
  .post("/logout", controller.logout);
