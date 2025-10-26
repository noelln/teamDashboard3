import React, { useState, Children } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";


const Sidebar = ({ children }) => {
    return (

        <aside className=" h-screen">
            <nav className="h-full flex flex-col bg-white  shadow-sm">
                <div className="p-4 pb-2  flex justify-between items-center">
                    <img src="/logo4.png" className="w-32" alt="" />

                </div>
                <ul className="flex-1 px-3">{children}

                </ul>

            </nav>
        </aside>
    )

}

export default Sidebar
export function SidebarItem({ icon, text, active, onClick }) {
    return (
        <li
            onClick={onClick}
            className={`relative flex items-center py-2 px-3 my-1
    font-medium rounded-md transition-colors select-none
    cursor-pointer
    ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }`}
        >
            {icon}
            <span className="w-42 ml-3">{text}</span>
        </li>

    );
}