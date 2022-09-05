'use strict'

/**
 * Acts as a rest server for the space portal..
 */
// File O/I feature.
const fs = require('fs');
// Web server feature.
const express = require('express');
// Web server app instance.
const app = express();

// Used HTTP port numbers
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 8080;

// HTTP server example setup.
app.get('/api/v1/planets', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/planets.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending planets");
        res.end(JSON.stringify(json));
    })
});
app.get('/api/v1/spaceships', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/spaceships.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending spaceships");
        res.end(JSON.stringify(json));            
    })
});
app.get('/api/v1/customers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/customers.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending customers");
        res.end(JSON.stringify(json));            
    })
});
app.get('/api/v1/reservations', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/reservations.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending reservations");
        res.end(JSON.stringify(json));            
    })
});
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));
