import authService from '../services/auth.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  return sendSuccess(res, {
  statusCode: 200,
  message: 'Login successful.',
  data: result,
});
});

export default {
  login,
};