import React, { useState } from "react";
import { LucideListFilter, ChevronDown } from "lucide-react";

const Header = ({ onSearch, onFilterStatus, onFilterAssignee, onSort, users, onAddClick }) => {

    const [showStatus, setShowStatus] = useState(false);
    const [showAssignee, setShowAssignee] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const toggleStatus = () => {
        setShowStatus(!showStatus);
        setShowAssignee(false);
        setShowSort(false);
    };
    const toggleAssignee = () => {
        setShowAssignee(!showAssignee);
        setShowStatus(false);
        setShowSort(false);
    };
    const toggleSort = () => {
        setShowSort(!showSort);
        setShowStatus(false);
        setShowAssignee(false);
    };

    return (
        <div className="mb-8 relative">

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-blue-900">Tasks</h1>
                <button
                    onClick={onAddClick}
                    className="cursor-pointer bg-indigo-700 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm"
                >
                    + Add Task
                </button>



            </div>


            <div className="flex justify-between border border-gray-200 bg-white rounded-lg p-3 shadow-sm relative">
                <div className="flex items-center gap-6">

                    <div className="flex border border-gray-300 rounded-lg px-3 py-2 w-80">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full text-sm focus:outline-none"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={toggleStatus}
                            className="cursor-pointer flex items-center text-gray-600 hover:text-indigo-800 text-sm"
                        >
                            Status <ChevronDown size={16} />
                        </button>

                        {showStatus && (
                            <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-10">
                                <ul className="text-sm text-gray-700">
                                    {["All", "Completed", "In Progress", "Pending"].map(
                                        (status) => (
                                            <li
                                                key={status}
                                                className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                                                onClick={() => {
                                                    onFilterStatus(status);
                                                    setShowStatus(false);
                                                }}
                                            >
                                                {status}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>


                    <div className="relative">
                        <button
                            onClick={toggleAssignee}
                            className="cursor-pointer flex items-center text-gray-600 hover:text-indigo-800 text-sm"
                        >
                            Assignees <ChevronDown size={16} />
                        </button>
                        {showAssignee && (
                            <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-40 z-10">
                                <ul className="text-sm text-gray-700">
                                    <li
                                        className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                                        onClick={() => {
                                            onFilterAssignee("All");
                                            setShowAssignee(false);
                                        }}
                                    >
                                        All
                                    </li>
                                    {users.map((user) => (
                                        <li
                                            key={user.id}
                                            className="px-3 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-2"
                                            onClick={() => {
                                                onFilterAssignee(user.id);
                                                setShowAssignee(false);
                                            }}
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-5 h-5 rounded-full"
                                            />
                                            {user.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    <div className="relative">
                        <button
                            onClick={toggleSort}
                            className="cursor-pointer flex items-center text-gray-600 hover:text-indigo-800 text-sm"
                        >
                            Sort <ChevronDown size={16} />
                        </button>

                        {showSort && (
                            <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-48 z-10">
                                <ul className="text-sm text-gray-700">
                                    {[
                                        { label: "Earliest First", value: "Earliest" },
                                        { label: "Latest First", value: "Latest" },
                                        { label: "A → Z", value: "A-Z" },
                                        { label: "Z → A", value: "Z-A" },
                                    ].map((option) => (
                                        <li
                                            key={option.value}
                                            className="px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                                            onClick={() => {
                                                onSort(option.value);
                                                setShowSort(false);
                                            }}
                                        >
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
