import express from "express";
import { createAdmin, loginAdmin } from "./adminController";

const adminRouter = express.Router();

// router.use(authController.protect);

// router
//   .route('/')
//   .get(adminController.getAllUsers)
//   .post(adminController.createAdmin);

// router
//   .route('/:id')
//   .get(adminController.getadmin)
//   .patch(adminController.updateUser)
//   .delete(adminController.deleteUser);
adminRouter.post("/register", createAdmin);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
