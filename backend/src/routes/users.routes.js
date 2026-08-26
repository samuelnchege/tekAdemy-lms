import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize('admin'),
  usersController.getUsers
);

router.get(
  '/:id',
  authenticate,
  authorize('admin'),
  usersController.getUserById
);

router.post(
  '/',
  authenticate,
  authorize('admin'),
  usersController.createUser
);

router.patch(
  '/:id',
  authenticate,
  authorize('admin'),
  usersController.updateUser
);

export default router;