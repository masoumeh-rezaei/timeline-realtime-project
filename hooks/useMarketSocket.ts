"use client";

import { useEffect, useRef, useState } from "react";

type Trade = {
    symbol: string;
    price: string;
    ts?: number;
};

type Snapshot = Record<string, Trade>;

type TradePayload =
    | { type: "trade"; symbol: string; price: string; ts?: number }
    | { type: "snapshot"; data: Record<string, string> };

export const useMarketSocket = (url = "ws://localhost:8080") => {
    const wsRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Snapshot>({});

    useEffect(() => {
        let mounted = true;

        const connect = () => {
            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = () => console.log("✅ Connected to backend WS");

            ws.onmessage = (event: MessageEvent) => {
                const payload: TradePayload = JSON.parse(event.data);

                if (payload.type === "trade") {
                    // TS safe, symbol و price مطمئن هستند
                    const { symbol, price, ts } = payload;
                    setMessages((prev) => ({
                        ...prev,
                        [symbol.toLowerCase()]: { symbol, price, ts },
                    }));
                }

                if (payload.type === "snapshot" && payload.data) {
                    const snapshot: Snapshot = Object.fromEntries(
                        Object.entries(payload.data).map(([symbol, val]) => {
                            const parsed = JSON.parse(val);
                            return [symbol, { symbol, price: parsed.price, ts: parsed.ts }];
                        })
                    );
                    setMessages(snapshot);
                }
            };

            ws.onclose = () => {
                if (!mounted) return;
                console.log("⚠ WS disconnected. Reconnecting in 2s...");
                setTimeout(() => {
                    if (mounted) connect();
                }, 2000);
            };
        };

        connect();

        return () => {
            mounted = false;
            wsRef.current?.close();
        };
    }, [url]);

    return { messages };
};
