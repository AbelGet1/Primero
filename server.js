// server.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware to parse JSON
app.use(express.json());

const users = []; // Simple in-memory user store (use a database in production)

// Register Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User Registered');
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid Credentials');
    }
});

// Protected Route (Admin Only)
app.get('/admin', verifyToken, (req, res) => {
    if (req.user.username === 'admin') {
        res.send('Welcome Admin');
    } else {
        res.status(403).send('Access Denied');
    }
});

// Middleware to Verify Token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');
    
    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

app.listen(3000, () => console.log('Server running on port 3000'));
