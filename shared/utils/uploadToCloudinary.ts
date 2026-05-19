import { cloud } from "./cloudinary";
import fs from "fs";
export const uploadToCloudinary = (
  file: Express.Multer.File,
  folder = "products",
) => {
  return new Promise<string>((resolve, reject) => {
    if (!file?.path) {
      return reject(new Error("Missing file path"));
    }

    if (!fs.existsSync(file.path)) {
      return reject(new Error("File not found on disk"));
    }

    cloud.uploader.upload(
      file.path,
      { folder, timeout: 120000 },

      (error, result) => {
        if (error || !result) {
          console.log(file.path);
          console.log("Cloudinary upload error:", error);
          console.log("Cloudinary result:", result);

          reject(error || new Error("Upload failed"));
        } else {
          resolve(result.secure_url);
        }
      },
    );
  });
};
