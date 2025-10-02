"use client";

import React, { useState } from "react";
import { Trade } from "@/hooks/useMarketSocket";

type Props = {
    messages: Record<
        string,
        {
            latest?: Trade;
            change?: number;
        }
    >;
};

export const PriceTable: React.FC<Props> = ({ messages }) => {
    const [sortBy, setSortBy] = useState<keyof Trade | "change">("symbol");
    const [asc, setAsc] = useState(true);

    const handleSort = (key: keyof Trade | "change") => {
        if (sortBy === key) setAsc(!asc);
        else {
            setSortBy(key);
            setAsc(true);
        }
    };

    const symbols = Object.keys(messages).sort((a, b) => {
        const ma = messages[a];
        const mb = messages[b];
        let va: number | string = 0;
        let vb: number | string = 0;

        if (sortBy === "change") {
            va = ma.change ?? 0;
            vb = mb.change ?? 0;
        } else if (sortBy === "symbol") {
            va = a;
            vb = b;
        } else {
            va = ma.latest ? parseFloat(ma.latest[sortBy] as string) : 0;
            vb = mb.latest ? parseFloat(mb.latest[sortBy] as string) : 0;
        }

        if (typeof va === "string" && typeof vb === "string")
            return asc ? va.localeCompare(vb) : vb.localeCompare(va);
        return asc ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });

    return (
        <div className="mt-6 overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
                <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                    {["Symbol", "Price", "Change (%)", "Time"].map((h, i) => (
                        <th
                            key={i}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 select-none"
                            onClick={() => handleSort(h.toLowerCase() as keyof Trade | "change")}
                        >
                            {h} {sortBy === h.toLowerCase() ? (asc ? "▲" : "▼") : ""}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {symbols.map((s) => {
                    const { latest, change } = messages[s];
                    const isUp = change !== undefined && change >= 0;
                    return (
                        <tr
                            key={s}
                            className={`transition duration-200 hover:bg-gradient-to-r ${
                                isUp ? "from-green-50 to-green-100" : "from-red-50 to-red-100"
                            }`}
                        >
                            <td className="px-4 py-2 font-medium">{s.toUpperCase()}</td>
                            <td className="px-4 py-2">
                                {latest ? parseFloat(latest.price).toFixed(2) : "-"}
                            </td>
                            <td
                                className={`px-4 py-2 font-semibold ${
                                    isUp ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {change !== undefined ? change.toFixed(2) : "-"}
                            </td>
                            <td className="px-4 py-2">
                                {latest ? new Date(latest.ts).toLocaleTimeString() : "-"}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
