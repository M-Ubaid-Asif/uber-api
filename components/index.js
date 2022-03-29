import express from "express";
import adminRouter from "./admin/adminRoute";
import userRouter from "./user/userRoute";
adminRouter
const router = express.Router();


router.use('/user',userRouter)
router.use('/admin',adminRouter)

export default router