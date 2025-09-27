"use client";
import Link from "next/link";
import { Home, BarChart3, Settings } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
}

const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside
            className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 text-gray-200 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                Menu
            </div>
            <nav className="p-4 space-y-2">
                {links.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
                    >
                        <Icon size={20} />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
