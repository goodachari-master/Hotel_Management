const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all rooms
router.get("/", (req, res) => {
  console.log("Get all rooms request received");
  db.query("SELECT id, room_number, type, price, available FROM rooms", (err, results) => {
    if (err) {
      console.error("Database error retrieving rooms:", err);
      res.status(500).send("Error retrieving rooms: " + err.message);
      return;
    }
    console.log(`Retrieved ${results.length} rooms`);
    res.json(results);
  });
});

// Add a new room
router.post("/", (req, res) => {
  console.log("Add room request received:", req.body);
  const { room_number, type, price } = req.body;
  
  if (!room_number || !type || !price) {
    console.log("Missing required fields");
    return res.status(400).send("Missing required fields: room_number, type, and price are required");
  }
  
  db.query(
    "INSERT INTO rooms (room_number, type, price) VALUES (?, ?, ?)",
    [room_number, type, parseFloat(price)],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).send("Error adding room: " + err.message);
        return;
      }
      console.log("Room added successfully with ID:", result.insertId);
      res.json({ message: "Room added", id: result.insertId });
    }
  );
});


// Delete a room
router.delete("/:id", (req, res) => {
  const roomId = req.params.id;
  
  db.query("DELETE FROM rooms WHERE id = ?", [roomId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting room");
      return;
    }
    res.send("Room deleted");
  });
});

module.exports = router;
