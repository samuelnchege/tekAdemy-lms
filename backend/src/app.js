import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';
import AppError from './errors/AppError.js';

import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

// Catch unknown routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found.`, 404));
});

// Error Handler (always last)
app.use(errorHandler);

export default app;