const DisplayUser = (props) => {
  return (
    <div>
      <h1>{props.user}</h1>
      <div>
        {props.userBookings.map((booking) => (
          <div key={booking.id}>
            <h2>{booking.venue.name}</h2>
            <p>Your Check Inn date: {booking.dateFrom}.</p>
            <p>
              Your Check Out date:
              {booking.dateTo}.
            </p>
            <p>Booked for : {booking.guests} Guests</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DisplayUser;
