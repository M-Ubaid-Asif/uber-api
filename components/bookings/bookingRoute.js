import express from "express";
import { userAuth } from "../../middlewares/auth";
import { createBooking, deleteBooking } from "./bookingController";

const bookingRouter = express.Router();

bookingRouter.post("/", userAuth, createBooking);
bookingRouter.delete("/:id", userAuth, deleteBooking);

export default bookingRouter;
