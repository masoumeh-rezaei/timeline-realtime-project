"use client";

import React from "react";
import { useMarketContext } from "@/context/MarketSocketContext";
import { PriceCard } from "@/Components/PriceCard";
import { PriceTable } from "@/Components/PriceTable";

export default function DashboardPage() {
    const { messages } = useMarketContext();
    const symbols = Object.keys(messages);

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            <h1 className="text-3xl font-bold mb-6">Trading Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symbols.map((s) => {
                    const msg = messages[s];
                    return (
                        <PriceCard
                            key={s}
                            symbol={s}
                            history={msg.history}
                            latestPrice={msg.latest?.price}
                            change={msg.change}
                        />
                    );
                })}
            </div>

            <PriceTable messages={messages} />
        </div>
    );
}
