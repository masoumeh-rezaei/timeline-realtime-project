"use client";

import React from "react";
import { useMarketContext } from "@/context/MarketSocketContext";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

type LineData = { time: string; btc: number; eth: number; ada: number };
type BarData = { symbol: string; volume: number };

export default function AnalyticsPage() {
    const { messages } = useMarketContext();

    // تاریخچه 20 داده آخر برای نمودار خطی
    const lineData: LineData[] = [];
    for (let i = 0; i < 20; i++) {
        const btcTrade = messages["btcusdt"]?.history[i];
        const ethTrade = messages["ethusdt"]?.history[i];
        const adaTrade = messages["adausdt"]?.history[i];
        if (!btcTrade || !ethTrade || !adaTrade) continue;
        lineData.push({
            time: new Date(btcTrade.ts).toLocaleTimeString(),
            btc: parseFloat(btcTrade.price),
            eth: parseFloat(ethTrade.price),
            ada: parseFloat(adaTrade.price),
        });
    }

    // نمودار میله‌ای حجم معاملات (استفاده از latest)
    const barData: BarData[] = [
        { symbol: "BTC", volume: messages["btcusdt"]?.latest?.volume ? parseFloat(messages["btcusdt"]!.latest!.volume) : 0 },
        { symbol: "ETH", volume: messages["ethusdt"]?.latest?.volume ? parseFloat(messages["ethusdt"]!.latest!.volume) : 0 },
        { symbol: "ADA", volume: messages["adausdt"]?.latest?.volume ? parseFloat(messages["adausdt"]!.latest!.volume) : 0 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics / Charts</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="font-semibold mb-2">Price Line Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <XAxis dataKey="time" />
                            <YAxis domain={["auto", "auto"]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="btc" stroke="#3b82f6" dot={false} isAnimationActive={true} />
                            <Line type="monotone" dataKey="eth" stroke="#10b981" dot={false} isAnimationActive={true} />
                            <Line type="monotone" dataKey="ada" stroke="#f59e0b" dot={false} isAnimationActive={true} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="font-semibold mb-2">Volume Bar Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="symbol" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="volume" fill="#3b82f6" isAnimationActive={true} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
