"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function VolumeBarChart({ data }: { data: any[] }) {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold mb-2">Volume Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="symbol" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="volume" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
