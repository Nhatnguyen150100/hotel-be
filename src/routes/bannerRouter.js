"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import bannerController from "../controllers/bannerController";
import multer from "multer";
import path, { join } from "path";
import fs from "fs";
const dotenv = require("dotenv");
dotenv.config();
const bannerRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir =
      process.env.NODE_ENV === "development"
        ? path.join(__dirname, "..", "..", "public", "banner")
        : path.join(__dirname, "..", "..", "..", "public", "banner");
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filePath = `${timestamp}_${extension}`;
    const url = `http://api.khachsanphuonghoang2samson.vn/banner/${filePath}`;
    // const url = `${process.env.BASE_URL_SERVER}/banner/${filePath}`;
    req.body = {
      ...req.body,
      url,
    };
    cb(null, filePath);
  },
});

const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({ storage, limits });

bannerRouter.post(
  "/",
  tokenMiddleware.verifyToken,
  upload.single("url"),
  bannerController.createImage
);

bannerRouter.get("/", bannerController.getAllImages);

bannerRouter.delete(
  "/:id",
  tokenMiddleware.verifyToken,
  bannerController.deleteImage
);

export default bannerRouter;
