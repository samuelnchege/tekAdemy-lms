import { Router } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';

const router = Router();

router.get('/health', (req, res) => {
  return sendSuccess(res, {
    message: 'TekAdemy LMS API is running.',
  });
});

export default router;