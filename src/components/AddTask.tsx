import React, { useState, useEffect } from "react";

const AddTask = ({ onClose, onAddTask, users, existingTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assigneeIds, setAssigneeIds] = useState([]);
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title || "");
            setDescription(existingTask.description || "");
            setAssigneeIds(existingTask.assigneeIds || []);
            setDate(existingTask.date || "");
            setStatus(existingTask.status || "Pending");
        }
    }, [existingTask]);

    const toggleAssignee = (id) => {
        if (assigneeIds.includes(id)) {
            setAssigneeIds(assigneeIds.filter((a) => a !== id));
        } else {
            setAssigneeIds([...assigneeIds, id]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: existingTask ? existingTask.id : Date.now(),
            title,
            description,
            assigneeIds,
            date,
            status,
        };
        onAddTask(newTask);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[420px]">
                <h2 className="text-lg font-semibold mb-4">
                    {existingTask ? "Edit Task" : "Add Task"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="text-sm font-medium">Task Title</label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            rows="3"
                        />
                    </div>


                    <div>
                        <label className="text-sm font-medium">Assign to</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {users.map((user) => (
                                <button
                                    type="button"
                                    key={user.id}
                                    onClick={() => toggleAssignee(user.id)}
                                    className={`flex items-center gap-1 border rounded-full px-2 py-1 text-sm ${assigneeIds.includes(user.id)
                                        ? "bg-indigo-100 border-indigo-500"
                                        : "bg-white border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-5 h-5 rounded-full"
                                    />
                                    {user.name}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div>
                        <label className="text-sm font-medium">Due Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>


                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className=" cursor-pointer text-gray-500 hover:text-gray-700 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            {existingTask ? "Confirm" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
