// index.ts
import { WebSocket } from "bun";
import { WebSocketServer } from "ws";  // Vous pouvez l'utiliser pour d'autres fonctionnalités si nécessaire

// Serveur WebSocket
Bun.serve({
  port: 3000, // Port pour le serveur WebSocket

  fetch(req, server) {
    if (server.upgrade(req)) {
      // Si la requête tente de se connecter en WebSocket, elle est acceptée
      return;
    }
    // Réponse pour les requêtes HTTP standards
    return new Response("Serveur HTTP Bun en cours d'exécution");
  },

  websocket: {
    open(ws) {
      console.log("Client connecté");
    },

    message(ws, message) {
      console.log("Message reçu :", message);
      ws.send(`Tu as dit : ${message}`);
    },

    close(ws, code, reason) {
      console.log("Client déconnecté");
    },
  },
});

// Serveur HTTP pour client HTTP
Bun.serve({
  port: 3001, // Port pour le serveur HTTP du client
  fetch(req) {
    return new Response("Client HTTP en ligne !");
  },
});

