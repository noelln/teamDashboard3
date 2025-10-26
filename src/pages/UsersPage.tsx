import React from "react";
import users from "../data/users.json";

const UsersPage = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-blue-900">Users</h1>
            </div>
            <div className="flex justify-between border border-gray-200 bg-white rounded-lg p-3 shadow-sm relative">
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center gap-2 text-gray-800"
                        >
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-6 h-6 rounded-full border"
                            /> -
                            <span>{user.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default UsersPage;
