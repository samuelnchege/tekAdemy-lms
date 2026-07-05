import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/health.routes.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', healthRoutes);

export default app;