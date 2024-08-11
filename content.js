// content.js (for managing content)

const express = require('express');
const router = express.Router();

let contents = []; // In-memory content store

// Create Content
router.post('/content', verifyToken, (req, res) => {
    const content = {
        id: contents.length + 1,
        title: req.body.title,
        body: req.body.body,
        createdBy: req.user.username
    };
    contents.push(content);
    res.status(201).json(content);
});

// Get All Content
router.get('/content', (req, res) => {
    res.json(contents);
});

// Get Single Content by ID
router.get('/content/:id', (req, res) => {
    const content = contents.find(c => c.id === parseInt(req.params.id));
    if (!content) return res.status(404).send('Content not found');
    res.json(content);
});

// Middleware for token verification
// Use `verifyToken` middleware from Step 1

module.exports = router;
