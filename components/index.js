import express from "express";
import adminRouter from "./admin/adminRoute";
import bookingRouter from "./bookings/bookingRoute";
import cabRouter from "./cab/cabRoutes";
import driverRouter from "./driver/driverRoute";
import userRouter from "./user/userRoute";
adminRouter;
const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/booking", bookingRouter);
router.use("/driver", driverRouter);
router.use("/cab", cabRouter);

export default router;
