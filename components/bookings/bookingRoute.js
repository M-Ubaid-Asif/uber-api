import express from "express";
import { userAuth } from "../../middlewares/auth";
import {
  createBooking,
  deleteBooking,
  getNearByCab,
} from "./bookingController";

const bookingRouter = express.Router();
// all booking routes
bookingRouter.post("/", userAuth, createBooking);
bookingRouter.delete("/:id", userAuth, deleteBooking);
bookingRouter.get("/", userAuth, getNearByCab);
export default bookingRouter;
