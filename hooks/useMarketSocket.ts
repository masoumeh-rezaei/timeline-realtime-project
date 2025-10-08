"use client";

import { useEffect, useRef, useState } from "react";
import { Trade, TradePayload } from "@/type/types";

type Snapshot = Record<string, Trade>;

export const useMarketSocket = (url = "ws://localhost:8080") => {
    const wsRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<
        Record<string, { latest?: Trade; change?: number; history: Trade[] }>
    >({});

    useEffect(() => {
        let mounted = true;

        const connect = () => {
            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = () => console.log("✅ Connected to backend WS");

            ws.onmessage = (event: MessageEvent) => {
                const payload: TradePayload = JSON.parse(event.data);

                if (payload.type === "trade") {
                    const { symbol, price, ts, volume } = payload;

                    setMessages(prev => {
                        const symbolKey = symbol.toLowerCase();
                        const prevHistory = prev[symbolKey]?.history || [];
                        const latestTrade: Trade = { symbol, price, ts, volume };
                        const change = prev[symbolKey]?.latest
                            ? ((parseFloat(price) - parseFloat(prev[symbolKey]!.latest!.price)) / parseFloat(prev[symbolKey]!.latest!.price)) * 100
                            : undefined;

                        return {
                            ...prev,
                            [symbolKey]: {
                                latest: latestTrade,
                                change,
                                history: [...prevHistory.slice(-49), latestTrade], // نگهداری 50 داده آخر
                            },
                        };
                    });
                }

                if (payload.type === "snapshot" && payload.data) {
                    const snapshot: Snapshot = Object.fromEntries(
                        Object.entries(payload.data).map(([symbol, val]) => {
                            const parsed = JSON.parse(val);
                            return [symbol, { ...parsed, symbol }];
                        })
                    );
                    setMessages(prev => {
                        const merged: typeof prev = {};
                        for (const [symbol, trade] of Object.entries(snapshot)) {
                            merged[symbol.toLowerCase()] = {
                                latest: trade,
                                change: undefined,
                                history: [trade],
                            };
                        }
                        return merged;
                    });
                }
            };

            ws.onerror = (err) => {
                console.error("⚠ WS error (network issue / blocked):", err);
                ws.close();
            };

            ws.onclose = () => {
                if (!mounted) return;
                console.log("⚠ WS disconnected. Reconnecting in 2s...");
                setTimeout(connect, 2000);
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
