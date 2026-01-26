const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all bookings
router.get("/", (req, res) => {
  const query = `SELECT b.id, b.customer_name, b.from_date, b.to_date, b.room_id, r.room_number, r.type 
                FROM bookings b 
                LEFT JOIN rooms r ON b.room_id = r.id`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error fetching bookings:", err);
      return res.status(500).json({ error: "Error fetching bookings: " + err.message });
    }
    res.json(results);
  });
});

// Book a room
router.post("/", (req, res) => {
  const { room_id, customer_name, from_date, to_date } = req.body;

  // Validate required fields
  if (!room_id || !customer_name || !from_date || !to_date) {
    return res.status(400).send("Missing required fields: room_id, customer_name, from_date, to_date");
  }

  // Check for conflicting bookings
  const checkQuery = "SELECT * FROM bookings WHERE room_id = ? AND ((? BETWEEN from_date AND to_date) OR (? BETWEEN from_date AND to_date) OR (from_date BETWEEN ? AND ?))";
  
  db.query(checkQuery, [room_id, from_date, to_date, from_date, to_date], (err, existingBookings) => {
    if (err) {
      console.error("Database error checking availability:", err);
      return res.status(500).send("Error checking availability");
    }
    
    if (existingBookings.length > 0) {
      return res.status(409).send("Room is already booked for the selected dates");
    }
    
    // Proceed with booking if available
    db.query(
      "INSERT INTO bookings (room_id, customer_name, from_date, to_date) VALUES (?, ?, ?, ?)",
      [room_id, customer_name, from_date, to_date],
      (err) => {
        if (err) {
          console.error("Database error booking room:", err);
          return res.status(500).send("Error booking room: " + err.message);
        }
        
        db.query(
          "UPDATE rooms SET available = false WHERE id = ?",
          [room_id],
          (updateErr) => {
            if (updateErr) {
              console.error("Database error updating room availability:", updateErr);
            }
            res.send("Room booked");
          }
        );
      }
    );
  });
});

// Delete/cancel a booking
router.delete('/:id', (req, res) => {
  const bookingId = req.params.id;
  
  // Get the room_id before deleting the booking
  db.query('SELECT room_id FROM bookings WHERE id = ?', [bookingId], (err, results) => {
    if (err) {
      console.error("Database error fetching booking:", err);
      return res.status(500).send("Error fetching booking");
    }
    
    if (results.length === 0) {
      return res.status(404).send("Booking not found");
    }
    
    const room_id = results[0].room_id;
    
    // Delete the booking
    db.query('DELETE FROM bookings WHERE id = ?', [bookingId], (err) => {
      if (err) {
        console.error("Database error deleting booking:", err);
        return res.status(500).send("Error deleting booking");
      }
      
      // Check if there are any other bookings for this room
      db.query('SELECT COUNT(*) as count FROM bookings WHERE room_id = ?', [room_id], (err, countResult) => {
        if (err) { 
          console.error("Database error checking room bookings:", err);
          return res.status(500).send("Error updating room status");
        }
        
        // If no other bookings for this room, set it as available
        if (countResult[0].count === 0) {
          db.query('UPDATE rooms SET available = true WHERE id = ?', [room_id], (updateErr) => {
            if (updateErr) {
              console.error("Database error updating room availability:", updateErr);
            }
            res.send("Booking cancelled and room availability updated");
          });
        } else {
          res.send("Booking cancelled");
        }
      });
    });
  });
});

module.exports = router;