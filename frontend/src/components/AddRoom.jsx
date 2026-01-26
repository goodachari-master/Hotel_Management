import { useState } from "react";
import api from "../api";

function AddRoom() {
  const [room, setRoom] = useState({
    room_number: "",
    type: "",
    price: ""
  });

  const addRoom = async () => {
    console.log("API BASE URL:", api.defaults.baseURL);

    try {
      const res = await api.post("/rooms", {
        room_number: room.room_number,
        type: room.type,
        price: Number(room.price)
      });

      console.log("SUCCESS:", res.data);
      alert("Room added successfully");
    } catch (err) {
      console.error("FRONTEND ERROR:", err);
      alert("Error adding  1 room");
    }
  };

  return (
    <div>
      <input
        placeholder="Room No"
        value={room.room_number}
        onChange={e => setRoom({ ...room, room_number: e.target.value })}
      />
      <input
        placeholder="Type"
        value={room.type}
        onChange={e => setRoom({ ...room, type: e.target.value })}
      />
      <input
        placeholder="Price"
        value={room.price}
        onChange={e => setRoom({ ...room, price: e.target.value })}
      />
      <button onClick={addRoom}>Add Room</button>
    </div>
  );
}

export default AddRoom;
