import User from "../components/user/userModel";
import { findOne } from "../helpers/common";
import { verifyJwt } from "../utils/jwt";

// auth for user
export const userAuth = async function (req, res, next) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).json({
      message: "you are not authenticated user",
    });
  }
  const token = cookie.split("=")[1];
  console.log(token);
  const decode = verifyJwt(token);
  console.log(decode);

  const user = await findOne(User, { _id: decode.id });
  console.log(user);
  if (!user) {
    return res.status(401).json({
      message: "you are not authenticated user",
    });
  }

  req.user = decode;
  // const token

  next();
};
