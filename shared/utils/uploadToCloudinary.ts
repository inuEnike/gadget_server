import streamifier from "streamifier";
import cloudinary from "./cloudinary";
export const uploadToCloudinary = (file: Express.Multer.File, folder = "products") => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error || !result) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      },
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
