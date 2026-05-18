import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter(_req, file, callback) {
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExt = [".png", ".jpg", ".jpeg", ".webp"];
    let extOk = allowedExt.includes(ext);
    if (!extOk) {
      return callback(new Error("Invalid file extension"));
    }

    if (!allowed.includes(file.mimetype)) {
      return callback(new Error("Invalid file type"));
    }

    callback(null, true);
  },
  
});
