import express from "express";
import { adminAuth } from "../../middlewares/auth";
import {
  getAllCabs,
  createCab,
  getCab,
  updateCab,
  deleteCab,
} from "./cabController";
const cabRouter = express.Router();

cabRouter.route("/").get(adminAuth, getAllCabs).post(adminAuth, createCab);

cabRouter
  .route("/:id")
  .get(adminAuth, getCab)
  .patch(adminAuth, updateCab)
  .delete(adminAuth, deleteCab);

export default cabRouter;
