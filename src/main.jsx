import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

function WebSocketConnection() {
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("wss://192.168.0.106:5000");

    wsRef.current.onopen = () => {
      console.log("WebSocket connection established.");
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send("hello im new client");
      }
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    // return () => {
    //   if (wsRef.current) {
    //     wsRef.current.close();
    //   }
    // };
  }, []);

  return null; // This component doesn't render anything
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <WebSocketConnection />
  </React.StrictMode>
);
