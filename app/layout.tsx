'use client'
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={isOpen} />
            <div className="flex flex-col flex-1">
                <Navbar onMenuClick={() => setIsOpen(!isOpen)} />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
        </body>
        </html>
    );
}
