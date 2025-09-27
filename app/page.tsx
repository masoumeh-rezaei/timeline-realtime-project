"use client";

import { useMarketSocket } from "@/hooks/useMarketSocket";
import PriceTicker from "@/Components/PriceTicker";

export default function HomePage() {
    const { messages } = useMarketSocket();
    console.log(messages);


    const symbols = ["BTCUSDT", "ETHUSDT", "ADAUSDT"];

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {symbols.map((sym) => (
                <PriceTicker
                    key={sym}
                    symbol={sym}
                    price={messages[sym.toLowerCase()]?.price}
                />
            ))}
        </div>
    );
}
