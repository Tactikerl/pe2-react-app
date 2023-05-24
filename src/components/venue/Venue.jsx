import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import BookingModal from "./BookingModal";

const Venue = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [venue, setVenue] = useState({ rating: 0 });
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
    console.log(guests, e);
    const newGuests = !e.target ? parseInt(e) : parseInt(e.target.value);
    console.log(newGuests);
    if (newGuests <= venue.maxGuests) {
      setGuests(newGuests);
    } else {
      alert("Number of guests exceeds maximum capacity.");
    }
  }

  async function CreateBooking() {
    const token = sessionStorage.getItem("accessToken");

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
      .then((result) => {
        setShow(true);
      })
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
        rating={venue.rating}
        guests={guests}
        bookingComponent={
          venue.bookings && (
            <DateRange ranges={allBookings} onChange={handleSelect} />
          )
        }
        handleGuestNumberChange={handleGuestsChange}
        bookingButton={
          sessionStorage.getItem("accessToken") &&
          sessionStorage.getItem("username") &&
          sessionStorage.getItem("email") ? (
            <button className="btn btn-primary mt-2" onClick={CreateBooking}>
              Make Booking
            </button>
          ) : null
        }
      />

      {venue.owner &&
        venue.owner.name &&
        sessionStorage.getItem("username") === venue.owner.name && (
          <div className="row  bg-danger-subtle g-0">
            <div className="col d-flex gap-3 m-2 justify-content-center">
              {/* add modal for delete button to confirm deletion */}
              <DeleteVenue id={venue.id} />
              <EditVenueButton venueId={venue.id} />
            </div>
          </div>
        )}

      <BookingModal
        show={show}
        setShow={setShow}
        handleGoToFront={() => navigate("/")}
        handleReload={() => window.location.reload()}
        dates={allBookings.at(-1)}
      />
    </div>
  );
};

export default Venue;
