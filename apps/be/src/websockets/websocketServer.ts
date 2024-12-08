import { WebSocketServer, WebSocket } from "ws";
import http from "http";

const clients = new Set<WebSocket>();

export const initWebSocketServer = (server: http.Server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("New client connected");
        clients.add(ws);

        ws.on("close", () => {
            console.log("Client disconnected");
            clients.delete(ws);
        });

        ws.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });
};

export const broadcast = (data: any) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
