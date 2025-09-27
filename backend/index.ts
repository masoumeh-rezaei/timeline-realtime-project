import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import Redis from "ioredis";

const PORT = process.env.PORT || 8080;
const SYMBOLS = ["btcusdt", "ethusdt", "adausdt"];
const BINANCE_STREAM = `wss://stream.binance.com:9443/stream?streams=${SYMBOLS.map(
    (s) => s + "@trade"
).join("/")}`;

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// HTTP server و WS server
const server = http.createServer();
const wss = new WebSocketServer({ server });

// مدیریت اتصال به Binance با reconnect و backoff
let binance: WebSocket;
let reconnectAttempts = 0;

function connectBinance() {
    binance = new WebSocket(BINANCE_STREAM);

    binance.on("open", () => {
        console.log("✅ Connected to Binance stream");
        reconnectAttempts = 0;
    });

    binance.on("message", async (msg: WebSocket.RawData) => {
        const parsed = JSON.parse(msg.toString());
        const data = parsed.data || parsed;
        const symbol: string = data.s || data.symbol;
        const price: string = data.p;
        const ts: number = data.T || Date.now();

        // ذخیره آخرین قیمت‌ها در Redis
        await redis.hset("prices", symbol.toLowerCase(), JSON.stringify({ price, ts }));

        // broadcast به همه کلاینت‌ها
        const payload = JSON.stringify({ type: "trade", symbol, price, ts });
        wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) client.send(payload);
        });
    });

    binance.on("close", () => {
        console.log("⚠ Binance connection closed. Reconnecting...");
        const timeout = Math.min(1000 * 2 ** reconnectAttempts, 30000); // max 30s
        reconnectAttempts++;
        setTimeout(connectBinance, timeout + Math.random() * 1000); // jitter
    });

    binance.on("error", (err) => {
        console.error("Binance WS error:", err.message);
        binance.close();
    });

    // Heartbeat ping/pong
    const interval = setInterval(() => {
        if (binance.readyState === WebSocket.OPEN) binance.ping();
    }, 15000);

    binance.on("close", () => clearInterval(interval));
}

connectBinance();

// مدیریت کلاینت‌ها
wss.on("connection", async (ws: WebSocket) => {
    console.log("🔗 Client connected");

    // ارسال snapshot اولیه
    const snapshot = await redis.hgetall("prices");
    ws.send(JSON.stringify({ type: "snapshot", data: snapshot }));

    ws.on("message", (msg: WebSocket.RawData) => {
        // مسیر اشتراک/لغو اشتراک
    });

    ws.on("close", () => console.log("❌ Client disconnected"));
});

// شروع سرور
server.listen(PORT, () => console.log(`🌐 WS backend listening on port ${PORT}`));
