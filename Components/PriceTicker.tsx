"use client";

import { cn } from "@/lib/utils";

interface PriceTickerProps {
    symbol: string;
    price?: string;
}

export default function PriceTicker({ symbol, price }: PriceTickerProps) {
    return (
        <div className={cn("p-4 rounded-lg shadow bg-white flex flex-col items-center")}>
            <span className="text-gray-500 font-medium">{symbol.toUpperCase()}</span>
            <span className="text-xl font-bold">{price ?? "-"}</span>
        </div>
    );
}
