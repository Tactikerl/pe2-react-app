import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ViewVenue from "./ViewVenue";
import { DateRange } from "react-date-range";
import { API_ALL_BOOKINGS, API_FETCH_VENUE, API_VENUE_PARAMS } from "./url";
import DeleteVenue from "./DeleteVenue";
import EditVenueButton from "./EditVenueButton";

const FetchedVenue = () => {
  const { id } = useParams();
  const [fetchedVenue, setFetchedVenue] = useState({});
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
    requestFetchedVenue(id);
  }, [id]);

  async function requestFetchedVenue(id) {
    const res = await fetch(`${API_FETCH_VENUE}${id}${API_VENUE_PARAMS}`);
    const json = await res.json();
    setFetchedVenue(json);

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
    <div>
      <ViewVenue
        name={fetchedVenue.name}
        images={fetchedVenue.media}
        owner={fetchedVenue.owner}
        created={fetchedVenue.created}
        updated={fetchedVenue.updated}
        meta={fetchedVenue.meta}
        maxGuests={fetchedVenue.maxGuests}
        price={fetchedVenue.price}
      />
      {fetchedVenue.owner &&
        fetchedVenue.owner.name &&
        sessionStorage.getItem("username") === fetchedVenue.owner.name && (
          <>
            <DeleteVenue id={fetchedVenue.id} />
            <EditVenueButton venueId={fetchedVenue.id} />
          </>
        )}

      {fetchedVenue.bookings && (
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

export default FetchedVenue;
