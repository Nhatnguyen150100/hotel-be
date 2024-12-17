"use-strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import newController from "../controllers/newController";

import multer from "multer";
import path, { join } from "path";
import fs from "fs";

const newRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "..", "public", "img-news");
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
    // const url = `http://api.khachsanphuonghoang2samson.vn/img-news/${filePath}`;
    const url = `${process.env.BASE_URL_SERVER}/img-news/${filePath}`;
    req.body = {
      ...req.body,
      thumbnailImg: url,
    };
    cb(null, filePath);
  },
});

const limits = { fileSize: 10 * 1024 * 1024 };

const upload = multer({ storage, limits });

newRouter.post(
  "/",
  tokenMiddleware.verifyToken,
  upload.single("thumbnailImg"),
  newController.createNew
);

newRouter.get("/", newController.getAllNews);

newRouter.put(
  "/:id",
  tokenMiddleware.verifyToken,
  upload.single("thumbnailImg"),
  newController.updateNew
);

newRouter.delete("/:id", tokenMiddleware.verifyToken, newController.deleteNew);

newRouter.get("/:id", newController.getNew);

export default newRouter;
