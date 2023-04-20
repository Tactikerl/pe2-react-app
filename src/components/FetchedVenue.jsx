import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ViewVenue from "./ViewVenue";
import { DateRange } from "react-date-range";

const FetchedVenue = () => {
  // const [selectedDates, setSelectedDates] = useState([]);
  // const handleChange = (e) => setSelectedDates(e);
  const { id } = useParams();
  const [fetchedVenue, setFetchedVenue] = useState({});
  const [booking, setBooking] = useState([
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
    });
    console.log(bookings);

    setBooking(bookings);
  }

  function handleSelect(date) {
    const nextCounters = booking.map((c, i, a) => {
      if (i === a.length - 1) {
        // Increment the clicked counter
        return Object.values(date)[0];
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setBooking(nextCounters);
    console.log(date);
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
        <DateRange ranges={booking} onChange={handleSelect} />
      )}
    </div>
  );
};

export default FetchedVenue;
