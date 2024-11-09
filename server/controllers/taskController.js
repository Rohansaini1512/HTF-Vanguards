import User from '../models/model.js';

const createTask = async (req, res) => {
  const { id } = req.params;
  const { taskName, dueDateTime, description, difficulty } = req.body;

  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTask = { taskName, dueDateTime, description, difficulty };
    user.pendingTasks.push(newTask);
    await user.save();

    res.status(201).json({ message: 'Task added', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
};

const readTask = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({id});
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ 
        completedTasks: user.completedTasks, 
        pendingTasks: user.pendingTasks 
    });
} catch (error) {
    res.status(500).json({ message: 'Error reading tasks', error });
    }
};

const updateTask = async (req, res) => {
  const { userId, taskId } = req.params;

  const updatedDate = req.body;

  try {
    const user = await User.findOne({ id: userId });
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    let task = user.pendingTasks.id(taskId) || user.completedTasks.id(taskId);
    if(!task) {
        return res.status(404).json({ message: 'Task not found' });
        }
    Object.assign(task, updatedDate);
    await user.save();
    res.status(200).json({ message: 'Task updated', task });
}catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
    }
}

const deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const user = await User.findOne({ id: userId });
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    user.pendingTasks.id(taskId)?.remove() || user.completedTasks.id(taskId)?.remove();
    await user.save();
    res.status(200).json({ message: 'Task deleted' });
}catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
    }
}

export default { createTask  , readTask , updateTask , deleteTask };
