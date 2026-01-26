const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This allows the frontend to talk to the backend
app.use(express.json()); // This allows the server to read JSON data sent from the frontend

let rooms = [];
let bookings = [];

// Route to get rooms
app.get('/rooms', (req, res) => {
    res.json(rooms);
});

// Route to add a room
app.post('/rooms', (req, res) => {
    const newRoom = { id: Date.now(), ...req.body };
    rooms.push(newRoom);
    res.status(201).json(newRoom);
});

// Route to delete a room
app.delete('/rooms/:id', (req, res) => {
    const { id } = req.params;
    rooms = rooms.filter(room => room.id != id);
    res.status(200).send();
});

// Route for bookings
app.post('/bookings', (req, res) => {
    const booking = { id: Date.now(), ...req.body };
    bookings.push(booking);
    res.status(201).json(booking);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});