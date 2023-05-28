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
import { findAvailableDate, getDatesBetween } from "../utils/dateHandling";

var tomorrow = new Date();
tomorrow.setHours(0, 0, 0, 0);
tomorrow.setDate(tomorrow.getDate() + 1);

const Venue = ({ title }) => {
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
  const [disabledDates, setDisabledDates] = useState([]);

  const [guests, setGuests] = useState(1);

  useEffect(() => {
    document.title = title;
  }, []);

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

    let disabledDateLists = json.bookings.map((booking) => {
      return getDatesBetween(booking.dateFrom, booking.dateTo);
    });
    let disabledList = disabledDateLists.flat();
    console.log(disabledList);

    let availableDate = findAvailableDate(tomorrow, disabledList);
    console.log(availableDate);

    bookings.push({
      startDate: availableDate,
      endDate: availableDate,
      color: "#eb4034",
    });

    setAllBookings(bookings);
    setDisabledDates(disabledList);
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
  }

  function handleGuestsChange(e) {
    const newGuests = !e.target ? parseInt(e) : parseInt(e.target.value);

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
      .then(() => {
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
            <DateRange
              ranges={allBookings}
              disabledDates={disabledDates}
              onChange={handleSelect}
              minDate={tomorrow}
            />
          )
        }
        startDate={allBookings.at(-1).startDate}
        endDate={allBookings.at(-1).endDate}
        handleGuestNumberChange={handleGuestsChange}
        userLoggedIn={
          sessionStorage.getItem("accessToken") &&
          sessionStorage.getItem("username") &&
          sessionStorage.getItem("email")
        }
        createBooking={CreateBooking}
      />

      {venue.owner &&
        venue.owner.name &&
        sessionStorage.getItem("username") === venue.owner.name && (
          <div className="row  bg-alt g-0">
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
