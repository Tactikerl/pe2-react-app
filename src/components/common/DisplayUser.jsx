import { Link } from "react-router-dom";
const DisplayUser = (props) => {
  const isManager = sessionStorage.getItem("isManager");
  const { user, userBookings, userVenues, showVenuesLink } = props;

  return (
    <div>
      <Link to={`/profiles/${user}`}>
        <h1>{user}</h1>
        <img src={user.avatar} alt={`Profile avatar for ${user}`} />
      </Link>
      <div>
        <h2>Your bookings</h2>
        {userBookings.map((booking) => (
          <div key={booking.id}>
            <h3>{booking.venue.name}</h3>
            <p>Your Check Inn date: {booking.dateFrom}.</p>
            <p>
              Your Check Out date:
              {booking.dateTo}.
            </p>
            <p>Booked for : {booking.guests} Guests</p>
          </div>
        ))}
      </div>
      {showVenuesLink && (
        <Link to={`/profiles/${user}/venues`}>
          <h2>Your Venues</h2>
        </Link>
      )}
      {isManager === "true"
        ? userVenues.map((venues) => (
            <div key={venues.id}>
              <h3>{venues.name}</h3>
              <p>{venues.price}</p>
              <p>{venues.maxGuests}</p>
              <p>{venues.meta.wifi}</p>
              <p>{venues.meta.parking}</p>
              <p>{venues.meta.breakfast}</p>
              <p>{venues.meta.pets}</p>
            </div>
          ))
        : ""}
    </div>
  );
};
export default DisplayUser;
