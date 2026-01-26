import { api } from "../api";
import { useState } from "react";

function AddRoom() {
  const [room, setRoom] = useState({});

  const addRoom = () => {
    api.post("/rooms", room);
  };

  return (
    <>
      <input placeholder="Room No" onChange={e => setRoom({...room, room_number: e.target.value})}/>
      <input placeholder="Type" onChange={e => setRoom({...room, type: e.target.value})}/>
      <input placeholder="Price" onChange={e => setRoom({...room, price: e.target.value})}/>
      <button onClick={addRoom}>Add Room</button>
    </>
  );
}

export default AddRoom;
