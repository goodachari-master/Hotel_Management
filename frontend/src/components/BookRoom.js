function BookRoom() {
  const book = () => {
    api.post("/bookings", {
      room_id: 1,
      customer_name: "John",
      from_date: "2026-02-01",
      to_date: "2026-02-05"
    });
  };

  return <button onClick={book}>Book Room</button>;
}
