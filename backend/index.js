// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/Config/db');
const authMiddleware = require('./src/middlewares/authMiddleware'); // Import authentication middleware
require('./src/middlewares/taskScheduler'); // Handles task expiry automation

// Initialize Express app
const app = express();

// Apply Middleware
app.use(express.json()); // Parses incoming JSON requests
//app.use(cors()); // Enables cross-origin requests

app.use(cors({
    origin: ['http://localhost:5173', 'https://todo-application-1-cvhe.onrender.com'],
    credentials: true
}));


// Connect to MongoDB
connectDB();

// 🔹 Authentication Routes
app.use('/api/auth', require('./src/routes/authRoutes')); // Login, Register, etc.

// 🔹 Protected TODO Routes (Requires Authentication)
app.use('/api/todos', authMiddleware, require('./src/routes/todoRoutes'));

// Root Route (Health Check)
app.get('/', (req, res) => {
    res.send('✅ TODO App Backend is Running 🚀');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
