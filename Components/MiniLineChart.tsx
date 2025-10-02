"use client";

import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Trade } from "@/hooks/useMarketSocket";

type Props = { history: Trade[]; color?: string };

export const MiniLineChart: React.FC<Props> = ({ history, color = "#4f46e5" }) => {
    const data = useMemo(() => {
        const N = 20;
        const last = history.slice(-N);
        const padded = Array.from({ length: N - last.length }, (_, i) => ({ index: i, price: last[0]?.price ?? 0 }));
        const indexed = last.map((t, i) => ({ index: padded.length + i, price: t.price }));
        return [...padded, ...indexed];
    }, [history]);

    return (
        <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                    <XAxis dataKey="index" hide />
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={500} // smooth animation
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
