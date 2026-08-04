import User from '../models/user.model.js';
import AppError from '../errors/AppError.js';
import generateToken from '../utils/generateToken.js';

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (!user.isActive) {
    throw new AppError(
      'Your account has been deactivated. Please contact your administrator.',
      403
    );
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
    },
  };
};

export default {
  login,
};