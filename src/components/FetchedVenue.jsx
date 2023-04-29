import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ViewVenue from "./ViewVenue";
import { DateRange } from "react-date-range";

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

  useEffect(() => {
    requestFetchedVenue(id);
  }, [id]);

  async function requestFetchedVenue(id) {
    const res = await fetch(
      `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );
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
  /* Make function use localStorage for auth token, set up form on venue page for number of 
guests in booking */
  async function CreateBooking() {
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      dateFrom: allBookings.at(-1).startDate,
      dateTo: allBookings.at(-1).endDate,
      guests: 1,
      venueId: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true",
      requestOptions
    )
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

      {fetchedVenue.bookings && (
        <DateRange ranges={allBookings} onChange={handleSelect} />
      )}
      {localStorage.getItem("accessToken") &&
      localStorage.getItem("username") &&
      localStorage.getItem("email") ? (
        <button onClick={CreateBooking}>Make Booking</button>
      ) : null}
    </div>
  );
};

export default FetchedVenue;
