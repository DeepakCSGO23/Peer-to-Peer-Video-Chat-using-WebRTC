const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// Load your SSL certificates
const server = https.createServer({
  key: fs.readFileSync('C:\\Certificate\\localhost+2-key.pem'),
  cert: fs.readFileSync('C:\\Certificate\\localhost+2.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('A new client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

server.listen(5000, '0.0.0.0', () => {
  console.log('WebSocket server is listening on wss://192.168.0.106:5000');
});
