"use-strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import roomController from "../controllers/roomController";
import uploadStorage from "../constants/multer";
const roomRouter = express.Router();

roomRouter.post(
  "/",
  tokenMiddleware.verifyToken,
  roomController.createRoomMiddleware,
  uploadStorage.fields(
    [1, 2, 3, 4, 5, 6].map((item) => ({ name: `img_${item}`, maxCount: 1 }))
  ),
  roomController.updateRoom
);

roomRouter.get("/", tokenMiddleware.verifyToken, roomController.getAllRooms);

roomRouter.put(
  "/:id",
  tokenMiddleware.verifyToken,
  uploadStorage.fields(
    [1, 2, 3, 4, 5, 6].map((item) => ({ name: `img_${item}`, maxCount: 1 }))
  ),
  roomController.updateRoom
);

roomRouter.delete(
  "/:id",
  tokenMiddleware.verifyToken,
  roomController.deleteRoom
);

roomRouter.get("/:id", tokenMiddleware.verifyToken, roomController.getRoom);
export default roomRouter;
