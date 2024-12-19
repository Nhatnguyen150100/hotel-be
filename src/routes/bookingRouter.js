"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import bookingController from "../controllers/bookingController";
const bookingRouter = express.Router();

bookingRouter.post("/", bookingController.createBooking);

bookingRouter.get(
  "/",
  tokenMiddleware.verifyToken,
  bookingController.getAllBooking
);

export default bookingRouter;
