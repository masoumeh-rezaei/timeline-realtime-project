"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Trade } from "@/hooks/useMarketSocket";

type Props = {
    symbol: string;
    history: Trade[];
};

export const PriceChart: React.FC<Props> = ({ symbol, history }) => {
    const data = history.map((t) => ({
        ...t,
        time: new Date(t.ts).toLocaleTimeString(),
        price: parseFloat(t.price), // تبدیل به number
    }));

    return (
        <div className="w-full h-64 border rounded-lg p-3 bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">{symbol.toUpperCase()}</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#4f46e5" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
