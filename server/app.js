import { config } from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import databaseconnect from './config/dbConnection.js';

// Load environment variables
config();

// Connect to the database
databaseconnect();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test route for server status
app.use('/ping', (req, res) => {
    res.send('Pong');
});

// Route setup
app.use('/api', taskRoutes); // Fix: added '/' to 'api'
app.use('/api', userRoutes)

// Default route for unknown paths
app.use('/', (req, res) => {
    res.status(200).json({
        data: 'JWTauth server'
    });
});

export default app;
