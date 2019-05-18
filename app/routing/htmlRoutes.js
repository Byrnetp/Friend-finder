'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Catch all endpoint which sends the homepage
router.all('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send(fs.readFileSync('./app/public/home.html', 'utf8'));
});

// Survey page
router.get('/survey', (req, res) => {
    res.status(200).send(fs.readFileSync('./app/public/survey.html', 'utf8'));
});

module.exports = router;