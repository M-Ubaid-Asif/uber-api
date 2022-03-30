import logger from "../../config/logger";
import User from "./userModel";
import { create, findOne } from "../../helpers/common";

export const registerUser = async (req, res, next) => {
  try {
    logger.info("inside User Controller Register user");
    const { name, email, password, confirmPassword, contactNo } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(409).json({
        message: "email is already registered",
      });
    }
    const data = {
      name,
      email,
      password,
      confirmPassword,
      contactNo,
    };
    const user = await create(User, data);
    return user
      ? res.status(201).json({
          message: "registration success",
          data: user,
        })
      : res.status(400).json({
          message: "registration failed",
        });
  } catch (error) {
    next(new Error(error));
  }
};

// login user
export const loginUser = async (req, res, next) => {
  try {
    logger.info("inside user controller login user");
    const { email, password } = req.body;

    const user = await findOne(User, { email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValid = await user.comparePassword(password);

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
