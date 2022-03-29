import express from 'express';
import { createAdmin } from './adminController';


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
adminRouter.post('/register',createAdmin)

export default adminRouter;