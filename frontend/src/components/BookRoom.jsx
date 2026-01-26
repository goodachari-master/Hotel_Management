import api from "../api";
import { useState, useEffect } from "react";

function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [booking, setBooking] = useState({
    room_id: "",
    customer_name: "",
    from_date: "",
    to_date: ""
  });

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data));
  }, []);

  const book = () => {
    api.post("/bookings", booking)
      .then(() => {
        alert("Room booked successfully!");
        setBooking({
          room_id: "",
          customer_name: "",
          from_date: "",
          to_date: ""
        });
      })
      .catch(err => {
        console.error(err);
        alert("Error booking room");
      });
  };

  return (
    <div>
      <select 
        value={booking.room_id}
        onChange={e => setBooking({...booking, room_id: e.target.value})}
      >
        <option value="">Select a room</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>
            {room.room_number} ({room.type}) - ₹{room.price}
          </option>
        ))}
      </select>
      <input 
        placeholder="Customer Name"
        value={booking.customer_name}
        onChange={e => setBooking({...booking, customer_name: e.target.value})}
      />
      <input 
        type="date"
        value={booking.from_date}
        onChange={e => setBooking({...booking, from_date: e.target.value})}
      />
      <input 
        type="date"
        value={booking.to_date}
        onChange={e => setBooking({...booking, to_date: e.target.value})}
      />
      <button onClick={book}>Book Room</button>
    </div>
  );
}

export default BookRoom;
