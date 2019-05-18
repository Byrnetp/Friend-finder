'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
let data = require('../data/friends.json');

router.get('/api/friends', (req, res) => {
    // Display a JSON with all possible friends
    res.status(200).json(data);
});

// Handles incoming survey results and compatability logic
router.post('/api/friends', (req, res) => {
    let topMatchIndex;
    // Collect survey data as it is sent
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    // Once all is sent, parse JSON survey data and compare to friend data
    req.on('end', () => {
        body = JSON.parse(body);
        let bestScore = 100;
        let totalScore;
        // For each friend in the friends JSON file
        for (let j = 0; j < data.length; j++) {
            let matchScores = [];
            // For each survey question
            for (let i = 0; i < body.scores.length; i++) {
                // Calculate score difference
                matchScores.push(Math.abs(body.scores[i] - data[j].scores[i]));
            }
            // Find the total difference
            totalScore = matchScores.reduce((a, b) => a + b);
            // If the total difference is the lowest so far, save the score and the associated friend
            if (totalScore < bestScore) {
                bestScore = totalScore;
                topMatchIndex = j;
            }
        }
        res.status(200).json(data[topMatchIndex]);
    });
});

module.exports = router;