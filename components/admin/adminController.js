import logger from "../../config/logger";
import Admin from "./adminModel";
import { create, findOne } from "../../helpers/common";

export const createAdmin = async (req, res, next) => {
  try {
    logger.info("adminController");
    const { name, email, mobileNo, password, confirmPassword } = req.body;

    const isExist = await Admin.findOne({ email });
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
    logger.info("create ad");
    const admin = await create(Admin, data);
    logger.info("admin create", admin);
    admin
      ? res.status(200).json({
          message: "Registration success",
        })
      : res.status(400).json({
          message: "Registration failed",
        });
  } catch (error) {
    next(new Error(error));
  }
};

// Login Admin

export const loginAdmin = async (req, res, next) => {
  try {
    logger.info("inside user controller login user");
    const { email, password } = req.body;

    const admin = await findOne(admin, { email });
    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValid = await admin.comparePassword(password);

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
