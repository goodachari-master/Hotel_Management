const express = require("express");
const cors = require("cors");

const roomsRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/rooms", roomsRoutes);
app.use("/bookings", bookingRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
