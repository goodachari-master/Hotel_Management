const mysql = require('mysql2');

// Database configuration (same as in db.js)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Veejnas@4002",
});

console.log("Connecting to MySQL...");

connection.query('CREATE DATABASE IF NOT EXISTS hotel_db', (err) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }

  console.log('Database created or already exists');

  // Switch to hotel_db
  connection.changeUser({database: 'hotel_db'}, (err) => {
    if (err) {
      console.error('Error selecting database:', err);
      return;
    }

    // Create rooms table
    const createRoomsTable = `
      CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        room_number VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        available BOOLEAN DEFAULT TRUE
      )
    `;

    connection.query(createRoomsTable, (err) => {
      if (err) {
        console.error('Error creating rooms table:', err);
        return;
      }

      console.log('Rooms table created or already exists');

      // Create bookings table
      const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS bookings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          room_id INT,
          customer_name VARCHAR(255) NOT NULL,
          from_date DATE NOT NULL,
          to_date DATE NOT NULL,
          FOREIGN KEY (room_id) REFERENCES rooms(id)
        )
      `;

      connection.query(createBookingsTable, (err) => {
        if (err) {
          console.error('Error creating bookings table:', err);
          return;
        }

        console.log('Bookings table created or already exists');
        console.log('Database initialization completed successfully!');
        
        // Close the connection
        connection.end();
      });
    });
  });
});