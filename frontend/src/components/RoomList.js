import { useEffect, useState } from "react";
import { api } from "../api";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data));
  }, []);

  const deleteRoom = (id) => {
    api.delete(`/rooms/${id}`);
    setRooms(rooms.filter(r => r.id !== id));
  };

  return (
    <>
      {rooms.map(room => (
        <div key={room.id}>
          {room.room_number} - ₹{room.price}
          <button onClick={() => deleteRoom(room.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default RoomList;
