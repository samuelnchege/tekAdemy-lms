import mongoose from 'mongoose';
import User from '../models/user.model.js';
import AppError from '../errors/AppError.js';

const createUser = async (userData) => {
  // Check if email already exists
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new AppError('A user with this email already exists.', 409);
  }

  // Create user
  const user = await User.create(userData);

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    mustChangePassword: user.mustChangePassword,
    createdAt: user.createdAt,
  };
};

const getUsers = async () => {
  const users = await User.find()
    .select('-password')
    .sort({ createdAt: -1 });

  return users;
};

const getUserById = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError('Invalid user ID.', 400);
  }

  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

const updateUser = async (userId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError('Invalid user ID.', 400);
  }

  const allowedFields = [
    'fullName',
    'email',
    'role',
    'profileImage',
  ];

  const filteredData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  if (Object.keys(filteredData).length === 0) {
    throw new AppError('No valid fields provided for update.', 400);
  }

  if (filteredData.email) {
    const existingUser = await User.findOne({
      email: filteredData.email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new AppError('A user with this email already exists.', 409);
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

const updateUserStatus = async (userId, isActive) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError('Invalid user ID.', 400);
  }

  if (typeof isActive !== 'boolean') {
    throw new AppError('isActive must be a boolean.', 400);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserStatus,
};