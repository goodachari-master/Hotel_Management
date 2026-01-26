import { useEffect, useState } from "react";
import api from "../api";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get("/rooms").then(res => setRooms(res.data));
  }, []);

  const deleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      api.delete(`/rooms/${id}`)
        .then(() => {
          setRooms(rooms.filter(r => r.id !== id));
        })
        .catch(err => {
          console.error(err);
          alert("Error deleting room");
        });
    }
  };

  return (
    <div>
      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        rooms.map(room => (
          <div key={room.id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #eee",
            margin: "5px 0"
          }}>
            <div>
              <strong>{room.room_number}</strong> - {room.type} - ₹{room.price}
            </div>
            <button 
              onClick={() => deleteRoom(room.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RoomList;
