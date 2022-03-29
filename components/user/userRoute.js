import express from "express";
import catchAsync from "../../utils/catchAsyn";
import { loginUser, registerUser } from "./userController";

const userRouter = express.Router();


userRouter.post('/register',catchAsync(registerUser))
userRouter.post('/login',catchAsync(loginUser))


export default userRouter