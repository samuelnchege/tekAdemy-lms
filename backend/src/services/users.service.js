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

export default {
  createUser,
};