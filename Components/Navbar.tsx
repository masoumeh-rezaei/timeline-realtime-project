"use client";
import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3 shadow-md">
            <div className="text-xl font-bold tracking-wide">🚀 Trading Dashboard</div>
            <button
                className="md:hidden p-2 rounded hover:bg-gray-700"
                onClick={onMenuClick}
            >
                <Menu size={24} />
            </button>
        </nav>
    );
}
