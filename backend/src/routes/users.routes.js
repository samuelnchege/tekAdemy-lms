import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('admin'),
  usersController.createUser
);

export default router;