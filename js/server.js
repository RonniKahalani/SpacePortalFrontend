'use strict'

const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const app = express();

const WS_PORT = parseInt(process.env.WS_PORT) || 3001;
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 3000;

const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));

// array of connected websocket clients
let connectedClients = [];

wsServer.on('connection', (ws, req) => {
    // add new connected client
    connectedClients.push(ws);
    console.log(`----------`);
    console.log(`New connection: connections:${connectedClients.length}`);
    console.log(`----------`);

    // listen for messages from the streamer, the clients will not send anything so we don't need to filter
    ws.on('message', data => {

        console.log(`----------`);
        console.log(`Sending message: connections:${connectedClients.length}`);
        console.log(`${data}`);
        console.log(`----------`);
    
        // send the base64 encoded frame to each connected ws
        connectedClients.forEach((ws, i) => {

            if (ws.readyState === ws.OPEN) { // check if it is still connected

                ws.send(data.toString()); // send

            } else { // if it's not connected remove from the array of connected ws
                connectedClients.splice(i, 1);
                console.log(`----------`);
                console.log(`Removed inactive connection: connections:${connectedClients.length}`);
                console.log(`----------`);
            }
        });
    });

    ws.on('error', error => {
        console.log(`error happend: ${error}`)
    });
});

// HTTP stuff
let clientCount = {"clientCount":connectedClients.length, "test": 3};
app.get('/messages', (req, res) => res.json(clientCount));
app.get('/about', (req, res) => res.sendFile(path.resolve(__dirname, './about.html')));
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));
