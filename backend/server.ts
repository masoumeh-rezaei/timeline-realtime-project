import WebSocket, { WebSocketServer } from "ws";

const PORT = 8080;
const SYMBOLS = ["btcusdt", "ethusdt", "adausdt"];

const wss = new WebSocketServer({ host: "127.0.0.1", port: PORT });
console.log(`🌐 WS server running on ws://127.0.0.1:${PORT}`);

setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            SYMBOLS.forEach((symbol) => {
                ws.send(
                    JSON.stringify({
                        type: "trade",
                        symbol,
                        price: (Math.random() * 30000 + 1000).toFixed(2),
                        volume: (Math.random() * 100).toFixed(4),
                        ts: Date.now(),
                    })
                );
            });

            // 👇 کندل تستی برای BTC
            const open = (Math.random() * 30000 + 1000);
            const close = open + (Math.random() * 500 - 250);
            const high = Math.max(open, close) + Math.random() * 200;
            const low = Math.min(open, close) - Math.random() * 200;

            const candle = {
                type: "candlestick",
                symbol: "btcusdt",
                open: open.toFixed(2),
                close: close.toFixed(2),
                high: high.toFixed(2),
                low: low.toFixed(2),
                ts: Date.now(),
            };

            console.log("🕯️ Sending candle:", candle); // ✅ چک کن این لاگ چاپ میشه
            ws.send(JSON.stringify(candle));
        }
    });
}, 1000);

wss.on("connection", (ws) => {
    console.log("🔗 Client connected");
});
