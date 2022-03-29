import express from "express"
import userRouter from "./user/userRoute"
const router = express.Router();

router.use('/user',userRouter)
router.use('/admin',adminRouter)

export default router