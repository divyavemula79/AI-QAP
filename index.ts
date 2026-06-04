import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Import Routes
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import quizRoutes from './routes/quizRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

// Load Env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/analytics', analyticsRoutes);

// Simple Healthcheck API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Quiz Platform Server is running smoothly!' });
});

// Root Error Handler Middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    message: err.message || 'An unexpected error occurred on the server',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Serve frontend in production (optional, if building full bundle)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist/client');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
