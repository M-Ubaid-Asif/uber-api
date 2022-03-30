import express from "express";
import { createBooking } from "./bookingController";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
// router.delete("/", deleteBooking);

export default bookingRouter;
