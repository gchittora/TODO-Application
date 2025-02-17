import { useState, useEffect } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", deadline: "", status: "ACTIVE" });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    updateTaskStatus(); // Check for expired tasks
  }, []);

  const addTask = () => {
    if (!newTask.title.trim() || !newTask.deadline) return alert("Title & Deadline required!");
    
    const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
    setTasks(updatedTasks);
    setNewTask({ title: "", description: "", deadline: "", status: "ACTIVE" });
  };

  const updateTaskStatus = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.status !== "COMPLETE" && new Date(task.deadline) < new Date()) {
        return { ...task, status: "EXPIRED" };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (filterStatus ? task.status === filterStatus : true))
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort by closest deadline

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">TODO Dashboard</h1>
      
      {/* Add New Task */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="datetime-local"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={addTask} className="w-full bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 border rounded">
          <option value="">All</option>
          <option value="ACTIVE">Active</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETE">Complete</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      {/* Task List */}
      <div className="w-full max-w-lg">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-2">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleString()}</p>
              <p className={`mt-2 px-2 py-1 rounded inline-block text-white text-sm ${
                task.status === "ACTIVE" ? "bg-blue-500" : 
                task.status === "IN_PROGRESS" ? "bg-yellow-500" : 
                task.status === "COMPLETE" ? "bg-green-500" : "bg-red-500"
              }`}>
                {task.status}
              </p>

              {/* Actions */}
              <div className="mt-2 flex gap-2">
                <button onClick={() => updateStatus(task.id, "IN_PROGRESS")} className="text-yellow-500">In Progress</button>
                <button onClick={() => updateStatus(task.id, "COMPLETE")} className="text-green-500">Complete</button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Logout Button */}
      <button onClick={() => console.log("Logout")} className="mt-6 bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
}
