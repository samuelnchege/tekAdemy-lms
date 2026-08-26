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

const getUsers = asyncHandler(async (req, res) => {
  const users = await usersService.getUsers();

  return sendSuccess(res, {
    message: 'Users retrieved successfully.',
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  return sendSuccess(res, {
    message: 'User retrieved successfully.',
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await usersService.updateUser(
    req.params.id,
    req.body
  );

  return sendSuccess(res, {
    message: 'User updated successfully.',
    data: user,
  });
});

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
};
