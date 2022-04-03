import Admin from "../components/admin/adminModel";
import Driver from "../components/driver/driverModel";
import User from "../components/user/userModel";
import { findOne } from "../helpers/common";
import { verifyJwt } from "../utils/jwt";

// auth for user
export const userAuth = async function (req, res, next) {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.status(401).json({
        message: "you are not authenticated user",
      });
    }
    const token = cookie.split("=")[1];
    // console.log(token);
    const decode = verifyJwt(token);
    // console.log(decode);

    const user = await findOne(User, { _id: decode.id });
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "access denied! not authenticated",
      });
    }

    req.user = decode;

    next();
  } catch (error) {
    next(new Error(error));
  }
};

// auth for admin
export const adminAuth = async function (req, res, next) {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.status(401).json({
        message:
          "you are not authenticated! this route can be access by admin only",
      });
    }
    const token = cookie.split("=")[1];
    // console.log(token);
    const decode = verifyJwt(token);
    // console.log(decode);

    const admin = await findOne(Admin, { _id: decode.id });
    // console.log(admin);
    if (!admin) {
      return res.status(401).json({
        message: "access denied! this route can be access by admin only",
      });
    }

    req.admin = decode;

    next();
  } catch (error) {
    next(new Error(error));
  }
};

// auth for driver
export const driverAuth = async function (req, res, next) {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.status(401).json({
        message: "you are not authenticated!",
      });
    }
    const token = cookie.split("=")[1];
    // console.log(token);
    const decode = verifyJwt(token);
    // console.log(decode);

    const driver = await findOne(Driver, { _id: decode.id });
    // console.log(driver);
    if (!driver) {
      return res.status(401).json({
        message: "Access denied not authenticated",
      });
    }

    req.driver = decode;

    next();
  } catch (error) {
    next(new Error(error));
  }
};
