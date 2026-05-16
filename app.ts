import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { ErrorMiddleware } from "./shared/middlewares/error.middleware";
import { productRouter } from "./src/modules/products/product.route";

export const app = express();

app.use(express.json());

app.get(
  "/health-check",
  (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "API running",
    });
  },
);
let version = "/api/v1/";

app.use(`${version}products`, productRouter);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "😕 Yooooo, No route found",
  });
});

app.use(ErrorMiddleware);
