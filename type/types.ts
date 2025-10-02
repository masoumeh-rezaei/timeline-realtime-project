// اطلاعات هر معامله
export type Trade = {
    symbol: string;
    price: string;      // Binance string
    ts?: number;        // timestamp
    volume?: string;    // حجم معامله
};

// payload دریافتی از WebSocket
export type TradePayload =
    | { type: "trade"; symbol: string; price: string; ts?: number; volume?: string }
    | { type: "snapshot"; data: Record<string, string> };

// تاریخچه معاملات هر نماد
export type MarketData = {
    latest?: Trade;
    change?: number;
    history: Trade[];
};

// snapshot کل بازار
export type MarketMessages = Record<string, MarketData>;
