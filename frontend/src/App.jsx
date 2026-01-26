import React from 'react';
import RoomList from './components/RoomList.jsx';
import AddRoom from './components/AddRoom.jsx';
import BookRoom from './components/BookRoom.jsx';

function App() {
  return (
    <div className="App">
      <h1>Hotel Booking System</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Add Room</h2>
          <AddRoom />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Book Room</h2>
          <BookRoom />
        </div>
      </div>
      <div>
        <h2>Available Rooms</h2>
        <RoomList />
      </div>
    </div>
  );
}

export default App;
