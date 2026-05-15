import type { Types } from "mongoose";
import type { Document } from "mongoose";

export interface IProducts extends Document {
  _id: Types.ObjectId;
  ProductName: string;
  ProductDesc: string;
  ProductBrand: string;
  ProductRatings?: Number;
  ProductReviews?: string;
  ProductPrice: Number;
  ProductImages?: [string];
  ProductVariants?: [string];
  ProductWarrantyDuration: Number;
}
