"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import facilitiesController from "../controllers/facilitiesController";
const facilitiesRouter = express.Router();

facilitiesRouter.post(
  "/",
  tokenMiddleware.verifyToken,
  facilitiesController.createFacility
);

facilitiesRouter.put(
  "/:id",
  tokenMiddleware.verifyToken,
  facilitiesController.updateFacility
);

facilitiesRouter.delete(
  "/:id",
  tokenMiddleware.verifyToken,
  facilitiesController.deleteFacility
);

facilitiesRouter.get("/", facilitiesController.getAllFacilities);
export default facilitiesRouter;
