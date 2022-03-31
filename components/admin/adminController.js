import logger from "../../config/logger";
import Admin from "./adminModel";
import { create, findOne } from "../../helpers/common";
import { signJwt } from "../../utils/jwt";

export const createAdmin = async (req, res, next) => {
  try {
    logger.info("adminController");
    const { name, email, mobileNo, password, confirmPassword } = req.body;

    const isExist = await Admin.findOne({ email });

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

    const admin = await findOne(Admin, { email });
    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    console.log("hello");
    const isValid = await admin.comparePassword(password);
    console.log("hello", isValid);
    if (!isValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const payload = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    };
    const token = signJwt(payload);

    res.cookie("jwt", token);

    return res.status(200).json({
      message: "login success",
    });
  } catch (error) {
    next(new Error(error));
  }
};
