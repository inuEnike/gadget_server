import { v2 as cloudinary } from "cloudinary";
import { ENV } from "../config/config";

export const cloud = cloudinary;
cloudinary.config({
  cloud_name: ENV.CLOUD_NAME,
  api_key: ENV.API_KEY,
  api_secret: ENV.API_SECRET,
});
