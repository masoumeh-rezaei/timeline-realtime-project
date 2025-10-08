"use client";

import React, { useMemo } from "react";
import { useMarketContext } from "@/context/MarketSocketContext";
import LineChartSection from "@/Components/LineChartSection";
import VolumeBarChart from "@/Components/VolumeBarChart";
import CandleChart from "@/Components/CandleChart";

export default function AnalyticsPage() {
    const { messages } = useMarketContext();

    // 🟦 Line Chart data
    const lineData = useMemo(() => {
        const arr: any[] = [];
        const btcHist = messages["btcusdt"]?.history ?? [];
        const ethHist = messages["ethusdt"]?.history ?? [];
        const adaHist = messages["adausdt"]?.history ?? [];

        for (let i = 0; i < Math.min(btcHist.length, ethHist.length, adaHist.length); i++) {
            arr.push({
                time: new Date(btcHist[i].ts ?? 0).toLocaleTimeString(),
                btc: parseFloat(btcHist[i].price),
                eth: parseFloat(ethHist[i].price),
                ada: parseFloat(adaHist[i].price),
            });
        }
        return arr;
    }, [messages]);

    // 🟩 Volume Bar Chart data
    const barData = useMemo(() => [
        { symbol: "BTC", volume: parseFloat(messages["btcusdt"]?.latest?.volume ?? "0") },
        { symbol: "ETH", volume: parseFloat(messages["ethusdt"]?.latest?.volume ?? "0") },
        { symbol: "ADA", volume: parseFloat(messages["adausdt"]?.latest?.volume ?? "0") },
    ], [messages]);

    // 🟥 Candlestick Chart data (BTC)
    const candleData = useMemo(() => {
        const btcHistory = messages["btcusdt"]?.history ?? [];
        const candles: any[] = [];

        for (let i = 0; i < btcHistory.length; i += 5) {
            const group = btcHistory.slice(i, i + 5);
            if (group.length < 2) continue;

            const prices = group.map(t => parseFloat(t.price));
            candles.push({
                time: new Date(group[group.length - 1].ts ?? 0).toLocaleTimeString(),
                open: prices[0],
                close: prices[prices.length - 1],
                high: Math.max(...prices),
                low: Math.min(...prices),
            });
        }
        return candles;
    }, [messages]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics / Charts</h1>
            <LineChartSection data={lineData} />
            <VolumeBarChart data={barData} />
            <CandleChart data={candleData} />
        </div>
    );
}
