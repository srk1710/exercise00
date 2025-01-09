import { useEffect, useRef, useState } from "react";

const WEBSOCKET_URL = "ws://localhost:3000";
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.tKYAMd3Mh9Wnq_eTNuDc8is95pZwsxzY7yu-iJQ4A1g";

export const useWebSocket = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const urlWithToken = `${WEBSOCKET_URL}?token=${JWT_TOKEN}`;
        ws.current = new WebSocket(urlWithToken);

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
