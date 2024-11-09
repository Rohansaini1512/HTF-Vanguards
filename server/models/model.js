import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  dueDateTime: { type: Date, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
});

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  completedTasks: [taskSchema],
  pendingTasks: [taskSchema],
});

const User = mongoose.model('User', userSchema);
export default User;
