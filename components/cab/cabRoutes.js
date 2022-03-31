import express from "express";
import {
  getAllCabs,
  createCab,
  getCab,
  updateCab,
  deleteCab,
} from "./cabController";
const cabRouter = express.Router();

cabRouter.route("/").get(getAllCabs).post(createCab);

cabRouter.route("/:id").get(getCab).patch(updateCab).delete(deleteCab);

export default cabRouter;
