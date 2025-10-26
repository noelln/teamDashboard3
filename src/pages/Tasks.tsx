import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import users from "../data/users.json";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterAssignee, setFilterAssignee] = useState("All");
    const [sortBy, setSortBy] = useState("");


    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:5001/tasks");
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };


    useEffect(() => {
        fetchTasks();
    }, []);


    const handleAddTask = async (newTask) => {
        await fetch("http://localhost:5001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });
        await fetchTasks();
    };


    const handleUpdateTask = async (updatedTask) => {
        await fetch(`http://localhost:5001/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });
        await fetchTasks();
    };

    // ✅ Delete task
    const handleDeleteTask = async (id) => {
        await fetch(`http://localhost:5001/tasks/${id}`, { method: "DELETE" });
        await fetchTasks();
    };


    const handleStatusChange = async (id, newStatus) => {
        const taskToUpdate = tasks.find((t) => t.id === id);
        if (!taskToUpdate) return;
        const updatedTask = { ...taskToUpdate, status: newStatus };

        await fetch(`http://localhost:5001/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        await fetchTasks();
    };


    const filteredTasks = tasks
        .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((task) =>
            filterStatus && filterStatus !== "All"
                ? task.status === filterStatus
                : true
        )
        .filter((task) =>
            filterAssignee && filterAssignee !== "All"
                ? task.assigneeIds.includes(Number(filterAssignee))
                : true
        )
        .sort((a, b) => {
            if (sortBy === "A-Z") return a.title.localeCompare(b.title);
            if (sortBy === "Z-A") return b.title.localeCompare(a.title);
            if (sortBy === "Earliest") return a.id - b.id;
            if (sortBy === "Latest") return b.id - a.id;
            return 0;
        });

    return (
        <div className="flex flex-col w-full px-10 py-8 bg-gray-50 min-h-screen">
            <Header
                onSearch={setSearch}
                onFilterStatus={setFilterStatus}
                onFilterAssignee={setFilterAssignee}
                onSort={setSortBy}
                users={users}
                onAddClick={() => {
                    setEditingTask(null);
                    setShowModal(true);
                }}
            />

            <div className="grid grid-cols-3 gap-6 mt-6">
                {filteredTasks.map((task) => {
                    const assignees = users.filter((u) =>
                        task.assigneeIds.includes(u.id)
                    );
                    return (
                        <TaskCard
                            key={task.id}
                            task={{ ...task, assignees }}
                            onEdit={(task) => {
                                setEditingTask(task);
                                setShowModal(true);
                            }}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    );
                })}
            </div>

            {showModal && (
                <AddTask
                    users={users}
                    onClose={() => setShowModal(false)}
                    onAddTask={editingTask ? handleUpdateTask : handleAddTask}
                    existingTask={editingTask}
                />
            )}
        </div>
    );
};

export default Tasks;
