"use client";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CandleChart({ data }: { data: any[] }) {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold mb-2">BTC Candlestick Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    {data.map((candle, index) => {
                        const isUp = candle.close >= candle.open;
                        return (
                            <rect
                                key={index}
                                x={index * 25}
                                width={10}
                                y={Math.min(candle.open, candle.close)}
                                height={Math.abs(candle.open - candle.close)}
                                fill={isUp ? "#10b981" : "#ef4444"}
                            />
                        );
                    })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
