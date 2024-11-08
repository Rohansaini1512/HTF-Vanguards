import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

const Dashboard = () => {
  const [tasks, setTasks] = useState<{ id: number; name: string; description: string; dueDate: string; difficulty: string; status: string }[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: '', difficulty: '', status: 'pending' })
  const [editTaskId, setEditTaskId] = useState<number | null>(null)
  const [formData] = useState({
    name: 'John Doe',
    gender: 'male',
    tasksDone: 5,
  })

  const handleAddTask = () => {
    if (newTask.name.trim()) {
      if (editTaskId !== null) {
        setTasks(tasks.map(task => task.id === editTaskId ? { ...task, ...newTask } : task))
        setEditTaskId(null)
      } else {
        setTasks([...tasks, { id: tasks.length + 1, ...newTask }])
      }
      setNewTask({ name: '', description: '', dueDate: '', difficulty: '', status: 'pending' })
      setShowDialog(false)
    }
  }

  const handleEditTask = (task) => {
    setNewTask(task)
    setEditTaskId(task.id)
    setShowDialog(true)
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleStatusChange = (id: number, status: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task))
  }

  const handleAIInput = () => {
    // Handle AI input for tasks
  }

  const renderTasks = (status: string) => (
    tasks.filter(task => task.status === status).map(task => (
      <Card key={task.id} className="shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{task.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700">{task.description}</p>
          <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
          <p className="text-sm text-gray-500">Difficulty: {task.difficulty}</p>
          <div className="flex flex-col space-y-2">
            <Button onClick={() => handleEditTask(task)} className="bg-yellow-500 hover:bg-yellow-700 text-white">Edit</Button>
            <Button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white">Delete</Button>
            <Button onClick={() => handleStatusChange(task.id, 'completed')} className="bg-green-500 hover:bg-green-700 text-white">Completed</Button>
            <Button onClick={() => handleStatusChange(task.id, 'partially_completed')} className="bg-orange-500 hover:bg-orange-700 text-white">Partially Completed</Button>
            <Button onClick={() => handleStatusChange(task.id, 'not_completed')} className="bg-gray-500 hover:bg-gray-700 text-white">Couldn't Complete</Button>
          </div>
        </CardContent>
      </Card>
    ))
  )

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="flex items-center mb-6">
          <Avatar src={formData.gender === 'male' ? '/path/to/male-avatar.png' : '/path/to/female-avatar.png'} alt="Profile Picture" className="w-20 h-20 rounded-full mr-6" />
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Good Evening, {formData.name}!</h1>
            <p className="text-lg text-gray-600">You have completed {formData.tasksDone} tasks.</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Your Tasks</h2>
          <Button onClick={() => setShowDialog(true)} className="bg-blue-500 hover:bg-blue-700 text-white">Add Task</Button>
        </div>

        {/* Pending Tasks */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pending Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTasks('pending')}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Completed Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTasks('completed')}
          </div>
        </div>

        {/* Partially Completed Tasks */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Partially Completed Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTasks('partially_completed')}
          </div>
        </div>

        {/* Couldn't Complete Tasks */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Couldn't Complete Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderTasks('not_completed')}
          </div>
        </div>

        {/* AI Input */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">AI Input</h3>
          <Button onClick={handleAIInput} className="bg-green-500 hover:bg-green-700 text-white">Get AI Input</Button>
        </div>
      </div>

      {/* Dialog component for adding/editing a task */}
      <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>{editTaskId !== null ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          </DialogHeader>
          <Input value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} className="w-full mb-4" placeholder="Task Name" />
          <Input value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="w-full mb-4" placeholder="Task Description" />
          <Input type="datetime-local" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="w-full mb-4" placeholder="Due Date and Time" />
          <Select value={newTask.difficulty} onValueChange={(value) => setNewTask({ ...newTask, difficulty: value })}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              <SelectItem value="easy" className="p-2 hover:bg-gray-100">Easy</SelectItem>
              <SelectItem value="medium" className="p-2 hover:bg-gray-100">Medium</SelectItem>
              <SelectItem value="hard" className="p-2 hover:bg-gray-100">Hard</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleAddTask} className="bg-blue-500 hover:bg-blue-700 text-white">{editTaskId !== null ? 'Update Task' : 'Add Task'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard
