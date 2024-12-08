import { useEffect, useRef, useState } from "react";

const WEBSOCKET_URL = "ws://localhost:3000";

export const useWebSocket = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(WEBSOCKET_URL);

        ws.current.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prev) => [...prev, data]);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    return { messages, isConnected };
};
