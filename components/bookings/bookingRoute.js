import express from "express";

const router = express.Router();

router.post("/", createBooking);
router.delete("/", deleteBooking);
