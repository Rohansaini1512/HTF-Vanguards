import express from 'express';
const router = express.Router();
import {createTask , readTask , updateTask , deleteTask} from '../controllers/taskController.js';
import { checkJwt, logHeaders, logToken } from '../middleware/middle.js';
router.use(logHeaders); // Log headers for all routes
router.use(checkJwt); // Apply JWT check to all routes
router.use(logToken); // Log token for all routes

// Define route and map it to controller
router.post('/api/user/task', createTask);
router.get('/user/:id/task', readTask);
router.put('/user/:userId/task/:taskId', updateTask);
router.delete('/user/:userId/task/:taskId', deleteTask);

export default router;
