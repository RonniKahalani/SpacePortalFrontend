'use strict'

/**
 * Acts as a messaging server, waiting for WebSocket client connections.
 */
// File O/I feature.
const path = require('path');
// Web server feature.
const express = require('express');
// Web server app instance.
const app = express();

// Used HTTP port numbers
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 3000;

// HTTP server example setup.
app.get('/api/v1/planets', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.resolve(__dirname, '../json/planets.json'))
});
app.get('/api/v1/spaceships', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.resolve(__dirname, '../json/spaceships.json'))
});
app.get('/api/v1/customers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.resolve(__dirname, '../json/customers.json'))
});
app.get('/api/v1/reservations', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.resolve(__dirname, '../json/reservations.json'))
});
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));
