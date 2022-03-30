import logger from "./config/logger.js";
import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./connections/dbConnection.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import router from "./components/index.js";
import { mongoseErrors } from "./helpers/errorHandler.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});
app.use("/api", router);

db();

app.use(mongoseErrors);

app.listen(config.server.port, () => {
  logger.info(`server is running on ${config.server.port}`);
});

export default app;
