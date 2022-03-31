import logger from "../../config/logger";
import Driver from "./driverModel";
import { create, findOne } from "../../helpers/common";

export const createDriver = async (req, res, next) => {
  try {
    logger.info("driverController");
    const { name, email, mobileNo, password, confirmPassword } = req.body;

    const isExist = await Driver.findOne({ email });
    logger.info("run");
    if (isExist) {
      return res.status(409).json({
        message: "Email is alredy registered",
      });
    }

    const data = {
      name,
      email,
      mobileNo,
      password,
      confirmPassword,
    };

    const driver = await create(Driver, data);

    driver
      ? res.status(200).json({
          message: "Driver Registration success",
        })
      : res.status(400).json({
          message: "Driver Registration failed",
        });
  } catch (error) {
    next(new Error(error));
  }
};

// Login Admin

export const loginDriver = async (req, res, next) => {
  try {
    logger.info("inside driver controller login driver");
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValid = await driver.comparePassword(password);

    if (!isValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    return res.status(200).json({
      message: "login success",
    });
  } catch (error) {
    next(new Error(error));
  }
};
