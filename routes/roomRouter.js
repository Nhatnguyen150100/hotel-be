"use-strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import roomController from "../controllers/roomController";
const roomRouter = express.Router();

roomRouter.post("/", tokenMiddleware.verifyToken, roomController.createRoom);

roomRouter.get("/", tokenMiddleware.verifyToken, roomController.getAllRooms);

roomRouter.put("/:id", tokenMiddleware.verifyToken, roomController.updateRoom);

roomRouter.delete(
  "/:id",
  tokenMiddleware.verifyToken,
  roomController.deleteRoom
);

roomRouter.get("/:id", tokenMiddleware.verifyToken, roomController.getRoom);
export default roomRouter;
