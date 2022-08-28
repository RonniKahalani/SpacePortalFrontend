'use strict'

/**
 * Acts as a messaging server, waiting for WebSocket client connections.
 */
// File O/I feature.
const path = require('path');
// Web server feature.
const express = require('express');
// WebSocket feature.
const WebSocket = require('ws');
// Web server app instance.
const app = express();

// Used WebSocket and HTTP port numbers
const WS_PORT = parseInt(process.env.WS_PORT) || 3001;
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 3000;

// WebSocket server instance.
const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));

// Array of connected websocket clients
let connectedClients = [];

// Triggered when a new client connects. 
wsServer.on('connection', (ws, req) => {
    // Add newly connected client to the list of clients.
    connectedClients.push(ws);
    console.log(`----------`);
    console.log(`New connection: Total:${connectedClients.length}`);

    // Triggered when clients sends a message.
    ws.on('message', data => {

        console.log(`----------`);
        console.log(`Sending message to ${connectedClients.length} connection(s)`);

        let pretty = JSON.stringify(JSON.parse(data),null,2); 
        console.log(`${pretty}`);
    
        // Send the base64 encoded frame to each connected ws
        connectedClients.forEach((ws, i) => {

            if (ws.readyState === ws.OPEN) { // check if it is still connected

                ws.send(data.toString()); // send

            } else { // if it's not connected remove from the array of connected ws
                connectedClients.splice(i, 1);
                console.log(`----------`);
                console.log(`Removed an inactive connection: Total active clients:${connectedClients.length}`);
            }
        });
    });

    // Triggered an error occurs.
    ws.on('error', error => {
        console.log(`An error happend: ${error}`)
    });
});

// HTTP server example setup.
let clientCount = {"clientCount":connectedClients.length, "test": 3};
app.get('/messages', (req, res) => res.json(clientCount));
//app.get('/about', (req, res) => res.sendFile(path.resolve(__dirname, './about.html')));
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));
