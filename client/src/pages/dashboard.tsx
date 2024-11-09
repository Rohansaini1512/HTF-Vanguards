import { useState, ChangeEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

import Assistant from "@/components/assistant";

type Task = {
	id: number;
	name: string;
	description: string;
	dueDate: string;
	difficulty: string;
	status: "pending" | "completed";
};

const Dashboard = () => {
	const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const [newTask, setNewTask] = useState<Task>({
		id: 0,
		name: "",
		description: "",
		dueDate: "",
		difficulty: "easy",
		status: "pending",
	});
	const [editTaskId, setEditTaskId] = useState<number | null>(null);

	// if (!isAuthenticated) {
	// 	return (
	// 		<div className="flex flex-col items-center justify-center min-h-screen">
	// 			<p className="text-lg text-gray-700">Please log in to access your dashboard.</p>
	// 			<Button onClick={() => loginWithRedirect()} className="mt-4 bg-blue-500 text-white">
	// 				Log in
	// 			</Button>
	// 		</div>
	// 	);
	// }

	const handleAddTask = () => {
		if (newTask.name.trim()) {
			if (editTaskId !== null) {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === editTaskId ? { ...task, ...newTask } : task
					)
				);
				setEditTaskId(null);
			} else {
				setTasks((prevTasks) => [
					...prevTasks,
					{ ...newTask, id: tasks.length + 1 },
				]);
			}
			setNewTask({
				id: 0,
				name: "",
				description: "",
				dueDate: "",
				difficulty: "easy",
				status: "pending",
			});
			setShowDialog(false);
		}
	};

	const handleEditTask = (task: Task) => {
		setNewTask(task);
		setEditTaskId(task.id);
		setShowDialog(true);
	};

	const handleDeleteTask = (id: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	const handleStatusChange = (id: number, status: "pending" | "completed") => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
		);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setNewTask((prevTask) => ({
			...prevTask,
			[name]: value,
		}));
	};

	const renderTasks = (status: "pending" | "completed") =>
		tasks
			.filter((task) => task.status === status)
			.map((task) => (
				<Card key={task.id} className="shadow-xl hover:shadow-2xl border rounded-lg">
					<CardHeader className="bg-indigo-500 p-4">
						<CardTitle>{task.name}</CardTitle>
					</CardHeader>
					<CardContent className="p-4 text-black">
						<p>{task.description}</p>
						<p>Due: {task.dueDate}</p>
						<p>Difficulty: {task.difficulty}</p>
						<div className="flex justify-around mt-4">
							<Button 
								onClick={() => handleEditTask(task)} 
								className="bg-yellow-500 hover:bg-yellow-400 text-white transition-colors duration-300"
							>
								Edit
							</Button>
							<Button 
								onClick={() => handleDeleteTask(task.id)} 
								className="bg-red-500 hover:bg-red-400 text-white transition-colors duration-300"
							>
								Delete
							</Button>
							<Button 
								onClick={() => handleStatusChange(task.id, "completed")} 
								className="bg-green-500 hover:bg-green-400 text-white transition-colors duration-300"
							>
								Completed
							</Button>
						</div>
					</CardContent>
				</Card>
			));

	return (
		<div className="h-screen w-screen overflow-y-auto bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white">
			<div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
				<div className="flex items-center mb-8 justify-between">
					<div className="flex items-center">
						<Avatar className="w-20 h-20 rounded-full mr-6">
							<AvatarImage
								src={user?.picture || "/path/to/default-avatar.png"}
								alt="Profile Picture"
							/>
							<AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
						</Avatar>
						<div>
							<h1 className="text-4xl font-bold text-gray-800">
								Welcome, {user?.name || "User"}!
							</h1>
							<p className="text-lg text-gray-600 mt-1">
								Let's get things done today.
							</p>
						</div>
					</div>
					<Button onClick={() => logout()} className="bg-red-500 hover:bg-red-400">
						Logout
					</Button>
				</div>

				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">Your Tasks</h2>
					<Button onClick={() => setShowDialog(true)} className="bg-indigo-500 hover:bg-indigo-400 text-white transition-colors duration-300">
						Add Task
					</Button>
				</div>

				<div className="space-y-6 overflow-y-auto">
					<div>
						<h3 className="text-xl font-semibold text-gray-800 mb-4">
							Pending Tasks
						</h3>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{renderTasks("pending")}
						</div>
					</div>
					<div>
						<h3 className="text-xl font-semibold text-gray-800 mb-4">
							Completed Tasks
						</h3>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{renderTasks("completed")}
						</div>
					</div>
				</div>

				<Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
					<DialogContent className="bg-white">
						<DialogHeader>
							<DialogTitle>{editTaskId !== null ? "Edit Task" : "Add New Task"}</DialogTitle>
						</DialogHeader>
						<Input
							value={newTask.name}
							onChange={handleInputChange}
							name="name"
							placeholder="Task Name"
						/>
						<Input
							value={newTask.description}
							onChange={handleInputChange}
							name="description"
							placeholder="Task Description"
						/>
						<Input
							type="datetime-local"
							value={newTask.dueDate}
							onChange={handleInputChange}
							name="dueDate"
							placeholder="Due Date"
						/>
						<Select
							value={newTask.difficulty}
							onValueChange={(value) =>
								setNewTask({ ...newTask, difficulty: value })
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select Difficulty" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="easy">Easy</SelectItem>
								<SelectItem value="medium">Medium</SelectItem>
								<SelectItem value="hard">Hard</SelectItem>
							</SelectContent>
						</Select>

						<DialogFooter>
							<Button onClick={handleAddTask}>Save Task</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
      <Assistant />
		</div>
	);
};

export default Dashboard;
