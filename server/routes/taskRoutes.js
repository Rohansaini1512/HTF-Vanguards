import express from 'express';
const router = express.Router();
import taskController from '../controllers/taskController.js';

// Define route and map it to controller
router.post('/user/:id/task', taskController.createTask);
router.get('/user/:id/task', taskController.readTask);
router.put('/user/:userId/task/:taskId', taskController.updateTask);
router.delete('/user/:userId/task/:taskId', taskController.deleteTask);

export default router;
