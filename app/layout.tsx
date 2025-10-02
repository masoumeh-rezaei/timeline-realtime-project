"use client";
import './globals.css'
import React from "react";
import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { MarketProvider } from "@/context/MarketSocketContext";
import { useMarketSocket } from "@/hooks/useMarketSocket";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);

    // WS data
    const { messages } = useMarketSocket("ws://127.0.0.1:8080");

    return (
        <html lang="en">
        <body className={inter.className}>
        <MarketProvider messages={messages}>
            <div className="flex h-screen bg-gray-100">
                <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
                <div className="flex flex-col flex-1">
                    <Navbar onMenuClick={() => setIsOpen(!isOpen)} />
                    <main className="flex-1 p-6 overflow-auto">{children}</main>
                </div>
            </div>
        </MarketProvider>
        </body>
        </html>
    );
}
