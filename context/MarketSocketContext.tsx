"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useMarketSocket } from "@/hooks/useMarketSocket";
import { Trade } from '@/type/types'
export type MarketMessage = {
    latest?: Trade;
    history: Trade[];
    change?: number;
};

export type MarketContextType = {
    messages: Record<string, MarketMessage>;
};

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const useMarketContext = (): MarketContextType => {
    const context = useContext(MarketContext);
    if (!context) throw new Error("useMarketContext must be used within MarketProvider");
    return context;
};

type MarketProviderProps = { children: ReactNode };

export const MarketProvider: React.FC<MarketProviderProps> = ({ children }) => {
    const { messages: wsMessages } = useMarketSocket();
    const [messages, setMessages] = useState<Record<string, MarketMessage>>({});

    useEffect(() => {
        const updated: Record<string, MarketMessage> = {};
        Object.entries(wsMessages).forEach(([symbol, msg]) => {
            const prevHistory = messages[symbol]?.history ?? [];
            const newLatest = msg.latest;
            const newHistory = newLatest ? [...prevHistory, newLatest].slice(-20) : prevHistory;
            updated[symbol] = { ...msg, history: newHistory };
        });
        setMessages(updated);
    }, [wsMessages]);

    return <MarketContext.Provider value={{ messages }}>{children}</MarketContext.Provider>;
};
