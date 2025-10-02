import WebSocket, { WebSocketServer } from "ws";

const PORT = 8080;
const SYMBOLS = ["btcusdt", "ethusdt", "adausdt"];

const wss = new WebSocketServer({ host: "127.0.0.1", port: PORT });
console.log(`🌐 WS server running on ws://127.0.0.1:${PORT}`);

// broadcast هر ۱ ثانیه داده تصادفی
setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
            SYMBOLS.forEach((symbol) => {
                ws.send(
                    JSON.stringify({
                        type: "trade",
                        symbol,
                        price: (Math.random() * 30000 + 1000).toFixed(2),
                        ts: Date.now(),
                    })
                );
            });
        }
    });
}, 1000);

wss.on("connection", (ws) => {
    console.log("🔗 Client connected");
    ws.on("close", () => console.log("❌ Client disconnected"));
});
