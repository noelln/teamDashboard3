import React, { useState } from "react";
import { Flag, MoreHorizontal, Edit, Trash2, Logs } from "lucide-react";

const TaskCard = ({
    task,
    onEdit = () => { },
    onDelete = () => { },
    onStatusChange = () => { },
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [statusMenu, setStatusMenu] = useState(false);

    const statusColors = {
        Completed: "bg-green-100 text-green-800",
        Pending: "bg-orange-100 text-orange-700",
        "In Progress": "bg-yellow-100 text-yellow-700",
    };

    const assignees = task?.assignees || [];

    return (
        <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
            {/* Top bar */}
            <div className="flex justify-between items-start">
                <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColors[task?.status] || "bg-gray-100 text-gray-700"
                        }`}
                >
                    {task?.status || "Pending"}
                </span>

                <div className="relative">
                    <button
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            setStatusMenu(false);
                        }}
                        className="cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                    >
                        <MoreHorizontal size={18} className="text-gray-500" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-20 text-sm text-gray-700">
                            <ul>
                                <li
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setStatusMenu(true);
                                    }}
                                    className="px-3 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-1"
                                >
                                    <Logs size={14} />    Status
                                </li>
                                <li
                                    onClick={() => {
                                        setMenuOpen(false);
                                        onEdit(task);
                                    }}
                                    className="px-3 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-1"
                                >
                                    <Edit size={14} /> Edit
                                </li>
                                <li
                                    onClick={() => {
                                        setMenuOpen(false);
                                        onDelete(task.id);
                                    }}
                                    className="px-3 py-2 hover:bg-red-50 text-red-600 cursor-pointer flex items-center gap-1"
                                >
                                    <Trash2 size={14} /> Delete
                                </li>
                            </ul>
                        </div>
                    )}

                    {statusMenu && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-30 text-sm text-gray-700">
                            {["Pending", "In Progress", "Completed"].map((status) => (
                                <div
                                    key={status}
                                    onClick={() => {
                                        onStatusChange(task.id, status);
                                        setStatusMenu(false);
                                    }}
                                    className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                                >
                                    {status}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-3">
                {task?.title || "Untitled Task"}
            </h2>


            {task?.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {task.description}
                </p>
            )}


            <div className="flex justify-between items-center mt-4">
                <div className="flex -space-x-2">
                    {assignees.map((p, i) => (
                        <img
                            key={i}
                            src={p.photo}
                            alt={p.name}
                            className="w-7 h-7 rounded-full border-2 border-white"
                            title={p.name}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Flag size={14} className="text-red-400" />
                    <span>{task?.date || "No Date"}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
