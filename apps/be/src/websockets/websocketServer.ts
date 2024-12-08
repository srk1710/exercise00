import { WebSocketServer, WebSocket as BaseWebSocket } from "ws";
import http from "http";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomWebSocket extends BaseWebSocket {
    user?: JwtPayload;
    isAlive: boolean;
}

const clients = new Set<CustomWebSocket>();
const JWT_SECRET = 'test_jwt';

export const initWebSocketServer = (server: http.Server) => {
    const wss = new WebSocketServer({ noServer: true });

    server.on("upgrade", (request, socket, head) => {
        const url = new URL(request.url || "", `http://${request.headers.host}`);
        const token = url.searchParams.get("token");

        console.log("Token received:", token);

        if (!token) {
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("JWT verification error:", err);
                socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.destroy();
                return;
            }

            wss.handleUpgrade(request, socket, head, (ws) => {
                (ws as CustomWebSocket).user = decoded as JwtPayload;
                wss.emit("connection", ws, request);
            });
        });
    });

    wss.on("connection", (ws: CustomWebSocket) => {
        console.log("New client connected:", ws.user);

        ws.isAlive = true;

        ws.on("pong", () => {
            ws.isAlive = true;
        });

        clients.add(ws);

        ws.on("close", () => {
            console.log("Client disconnected");
            clients.delete(ws);
        });

        ws.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });

    setInterval(() => {
        clients.forEach((ws) => {
            if (!ws.isAlive) {
                ws.terminate();
                clients.delete(ws);
                console.log("Stale client disconnected");
            } else {
                ws.isAlive = false;
                ws.ping();
            }
        });
    }, 30000);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const broadcast = (data: any) => {
    clients.forEach((client) => {
        if (client.readyState === BaseWebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
