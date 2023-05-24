import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ViewVenue from "./ViewVenue";
import { DateRange } from "react-date-range";
import {
  API_ALL_BOOKINGS,
  API_FETCH_VENUE,
  API_VENUE_PARAMS,
} from "../utils/url";
import DeleteVenue from "../common/DeleteVenue";
import EditVenueButton from "../common/EditVenueButton";

const Venue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [allBookings, setAllBookings] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    requestVenue(id);
  }, [id]);

  async function requestVenue(id) {
    const res = await fetch(`${API_FETCH_VENUE}${id}${API_VENUE_PARAMS}`);
    const json = await res.json();
    setVenue(json);

    let bookings = json.bookings.map((booking) => {
      return {
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
        disabled: true,
      };
    });

    bookings.push({
      startDate: new Date(),
      endDate: new Date(),
      color: "#eb4034",
    });
    console.log(bookings);

    setAllBookings(bookings);
  }

  function handleSelect(date) {
    const nextCounters = allBookings.map((booking, i, a) => {
      if (i === a.length - 1) {
        let newDates = Object.values(date).at(0);
        return {
          ...booking,
          ...newDates,
        };
      } else {
        return booking;
      }
    });
    setAllBookings(nextCounters);
    console.log(date);
  }

  function handleGuestsChange(e) {
    const newGuests = parseInt(e.target.value);
    setGuests(newGuests);
  }

  async function CreateBooking() {
    const token = sessionStorage.getItem("accessToken");

    /** make a check to see that guestNmbr do not exceed maxGuests for the venue id, also make guestNmbr be set at same time with the date selected */
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      dateFrom: allBookings.at(-1).startDate,
      dateTo: allBookings.at(-1).endDate,
      guests: guests,
      venueId: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_ALL_BOOKINGS}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="container">
      <ViewVenue
        name={venue.name}
        images={venue.media}
        description={venue.description}
        owner={venue.owner}
        created={venue.created}
        updated={venue.updated}
        meta={venue.meta}
        maxGuests={venue.maxGuests}
        price={venue.price}
        location={venue.location}
      />
      {venue.owner &&
        venue.owner.name &&
        sessionStorage.getItem("username") === venue.owner.name && (
          <>
            <DeleteVenue id={venue.id} />
            <EditVenueButton venueId={venue.id} />
          </>
        )}

      {venue.bookings && (
        <DateRange ranges={allBookings} onChange={handleSelect} />
      )}
      {sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("username") &&
      sessionStorage.getItem("email") ? (
        <button onClick={CreateBooking}>Make Booking</button>
      ) : null}
    </div>
  );
};

export default Venue;
