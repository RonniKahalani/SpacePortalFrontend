'use strict'

/**
 * Acts as a rest server for the space portal..
 */
// File O/I feature.
const fs = require('fs');
// Web server feature.
const express = require('express');
// CORS feature.
const cors = require('cors');
// Web server app instance.
const app = express();

// Used HTTP port numbers
const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 8080;

// Returns planets.
app.get('/api/v1/planets', cors(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/planets.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending planets: " + JSON.stringify(json));
        res.json(json);
    })
});
// Returns spaceships.
app.get('/api/v1/spaceships', cors(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/spaceships.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending spaceships: " + JSON.stringify(json));
        res.json(json);
    })
});
// Returns customers.
app.get('/api/v1/customers', cors(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/customers.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending customers: " + JSON.stringify(json));
        res.json(json);
    })
});
// Returns reservations.
app.get('/api/v1/reservations', cors(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('../json/reservations.json', 'utf-8', (err, data) => {
        let json = JSON.parse(data);
        console.log("Sending reservations: " + JSON.stringify(json));
        res.json(json);
    })
});
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));
