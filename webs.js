import { WebSocketServer, WebSocket } from "ws";

let wss;
function startWebsocket() {
  wss = new WebSocketServer({ port: 8080 });

  wss.on("connection", (ws) => {
    console.log("New Client Connected");

    ws.on("message", (message) => {
      console.log(`Received from client: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client Disconnected");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  console.log("WebSocket Server started on port 8080");
}

const broadcastUpdate = (data) => {
  if (!wss || wss.clients.size === 0) {
    console.warn("No clients connected to broadcast.");
    return;
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

export { broadcastUpdate, startWebsocket };
