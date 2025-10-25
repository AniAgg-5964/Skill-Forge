import 'dotenv/config';           // Loads .env automatically
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => res.send('🚀 Skill Forge backend is running!'));

// Auth routes
app.use('/api/auth', authRoutes);

// Catch-all route for undefined endpoints
// app.all('*', (req, res) => {
//   res.status(404).json({ message: 'Endpoint not found' });
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Global unhandled rejection handler
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

