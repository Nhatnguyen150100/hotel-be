import multer from "multer";
import path, { join } from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const roomId = req.roomId;
    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "img-room",
      roomId
    );
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const roomId = req.roomId;
    const extension = path.extname(file.originalname);
    const filePath = `${file.fieldname}${extension}`;
    const url = `${process.env.BASE_URL_SERVER}/img-room/${roomId}/${filePath}`;
    req.body = {
      ...req.body,
      [`${file.fieldname}`]: url,
    };
    cb(null, filePath);
  },
});

const limits = { fileSize: 100 * 1024 * 1024 };

const uploadStorage = multer({ storage, limits });

export default uploadStorage;
