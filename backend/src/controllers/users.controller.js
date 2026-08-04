import usersService from '../services/users.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

const createUser = asyncHandler(async (req, res) => {
  const result = await usersService.createUser(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'User created successfully.',
    data: result,
  });
});

export default {
  createUser,
};