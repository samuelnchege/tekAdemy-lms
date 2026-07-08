import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';


import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', healthRoutes);

// Error Handler (always last)
app.use(errorHandler);

export default app;