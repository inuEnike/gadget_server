import type { Schema } from "mongoose";
import type { Document, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  parentCategory: Schema.Types.ObjectId;
}
