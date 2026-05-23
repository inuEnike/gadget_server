import cors from "cors";
import { categoryRouter } from "./src/modules/category/category.route";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { ErrorMiddleware } from "./shared/middlewares/error.middleware";
import { productRouter } from "./src/modules/products/product.route";
import { AuthRouter } from "./src/modules/auth/auth.route";
import helmet from "helmet";
import cookieParser from "cookie-parser";

export const app = express();

app.use(helmet());
app.use(cookieParser());
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
app.use(`${version}auth`, AuthRouter);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "😕 Yooooo, No route found",
  });
});

app.use(ErrorMiddleware);
