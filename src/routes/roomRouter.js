"use-strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import roomController from "../controllers/roomController";
import uploadStorage from "../config/multer";
const roomRouter = express.Router();

roomRouter.post(
  "/",
  tokenMiddleware.verifyToken,
  uploadStorage.fields([
    { name: "img_1", maxCount: 1 },
    { name: "img_2", maxCount: 1 },
    { name: "img_3", maxCount: 1 },
    { name: "img_4", maxCount: 1 },
    { name: "img_5", maxCount: 1 },
    { name: "img_6", maxCount: 1 }
  ]),
  roomController.createRoom
);

roomRouter.get("/", roomController.getAllRooms);

roomRouter.put(
  "/:id",
  tokenMiddleware.verifyToken,
  uploadStorage.fields([
    { name: "img_1", maxCount: 1 },
    { name: "img_2", maxCount: 1 },
    { name: "img_3", maxCount: 1 },
    { name: "img_4", maxCount: 1 },
    { name: "img_5", maxCount: 1 },
    { name: "img_6", maxCount: 1 }
  ]),
  roomController.updateRoom
);

roomRouter.delete(
  "/:id",
  tokenMiddleware.verifyToken,
  roomController.deleteRoom
);

roomRouter.get("/:id", roomController.getRoom);
export default roomRouter;
