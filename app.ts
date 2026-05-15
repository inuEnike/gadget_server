import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { ErrorMiddleware } from "./shared/middlewares/error.middleware";

export const app = express();

app.use(ErrorMiddleware);

app.get(
  "/health-check",
  (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "API running",
    });
  },
);
