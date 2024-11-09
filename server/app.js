import { config } from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
const app = express();
// const authRouter = require('./router/authRoute');

import cookieParser from 'cookie-parser';
import cors from 'cors';
import databaseconnect from './config/dbConnection.js';
config();

databaseconnect

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/ping', (req,res) => {
    res.send('Pong');
});

// app.use('/api/auth/', authRouter);
app.use('api', taskRoutes);

app.use('/',(req,res) => {
    res.status(200).json({
        data: 'JWTauth server'
    });
});

export default app;