import 'dotenv/config'; // Loads .env automatically
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  'https://skill-forge-rho.vercel.app', // Frontend (Production)
  'http://localhost:5173',              // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// --- Middleware ---
app.use(express.json());

// --- Connect to MongoDB ---
connectDB();

// --- Test route ---
app.get('/', (req, res) => res.send('🚀 Skill Forge backend is running!'));

// --- Auth routes ---
app.use('/api/auth', authRoutes);

// --- Handle undefined endpoints ---
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// --- Global error handlers ---
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
