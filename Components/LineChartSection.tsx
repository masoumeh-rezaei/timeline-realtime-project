"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function LineChartSection({ data }: { data: any[] }) {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold mb-2">Price Line Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="btc" stroke="#3b82f6" dot={false} />
                    <Line dataKey="eth" stroke="#10b981" dot={false} />
                    <Line dataKey="ada" stroke="#f59e0b" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
