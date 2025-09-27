import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("🔗 Client connected");
    ws.send(JSON.stringify({ type: "hello", msg: "Welcome client!" }));
});

console.log("🌐 WS test server running on ws://localhost:8080");
