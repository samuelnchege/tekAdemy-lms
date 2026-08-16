import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import AppError from '../errors/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication token is required.', 401);
  }

  const token = authHeader.split(' ')[1];

  let decoded;

  try {
    decoded = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new AppError('Invalid or expired authentication token.', 401);
  }

  req.user = decoded;

  next();
});

export default authenticate;