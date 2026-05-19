import cors from "cors";
import { categoryRouter } from "./src/modules/category/category.route";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { ErrorMiddleware } from "./shared/middlewares/error.middleware";
import { productRouter } from "./src/modules/products/product.route";

export const app = express();

app.use(
  cors({
    origin: ["*"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
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
app.use(`${version}category`, categoryRouter);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "😕 Yooooo, No route found",
  });
});

app.use(ErrorMiddleware);
