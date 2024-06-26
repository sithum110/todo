const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./db/user'); // Ensure the path is correct

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Basic route to check the server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to handle POST requests to add a user
app.post('/user', async (req, res) => {
    try {
        await addUser(req, res);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred', details: error.message });
    }
});

async function addUser(req, res) {
    try {
        const userData = req.body;
        let user = new User(userData);
        await user.save();
        res.status(201).send({ message: 'User added successfully', });
    } catch (error) {
        res.status(500).send({ error: 'Failed to add user', details: error.message });
    }
}

async function connectdb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/todo', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

connectdb().catch(error => console.error(error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
