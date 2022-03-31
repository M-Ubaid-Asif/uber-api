import express from "express";
import { createDriver, loginDriver } from "./driverController";

const driverRouter = express.Router();

driverRouter.post("/register", createDriver);
driverRouter.post("/login", loginDriver);

export default driverRouter;
