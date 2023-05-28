import { Link } from "react-router-dom";

import dollar from "../../assets/icons/dollar-sign.svg";
import users from "../../assets/icons/users.svg";

import { useEffect, useState } from "react";
import { API_BOOKINGS_TRUE, API_PROFILES, API_HEADERS } from "../utils/url";
import Facilities from "../common/Facilities";
import EditVenueButton from "../common/EditVenueButton";
import DeleteVenue from "../common/DeleteVenue";

const VenueManager = ({ user, token }) => {
  const [managerData, setManagerData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    async function fetchManagerData() {
      try {
        if (!token) {
          setStatus("error");
          return;
        }

        const res = await fetch(`${API_PROFILES}${user}${API_BOOKINGS_TRUE}`, {
          method: "GET",
          headers: API_HEADERS,
          redirect: "follow",
        });

        const contentType = res.headers.get(`Content-Type`);
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          setManagerData(json);
          setStatus("success");
        } else {
          setStatus("error");

          console.log("No user logged in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setStatus("error");
      }
    }
    fetchManagerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(date) {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  }
  return (
    <>
      {managerData?.map((venue) => (
        <div key={venue.id}>
          <div className="card m-2 bg-alt">
            <div className="card-body">
              <Link to={`/venues/${venue.id}`}>
                <h3>{venue.name}</h3>
              </Link>
              <p>
                <img src={dollar}></img>: {venue.price}
              </p>
              <p>
                <img src={users}></img> : {venue.maxGuests}
              </p>
              <Facilities meta={venue.meta} />
              <div className="d-flex gap-2 mt-2 mb-2">
                <EditVenueButton id={venue.id} />
                <DeleteVenue id={venue.id} />
              </div>
              {venue.bookings?.length > 0 && <h4>Bookings</h4>}
              <div className="card">
                <ul className="list-group list-group-flush">
                  {venue.bookings?.map((booking) => (
                    <li className="list-group-item" key={booking.id}>
                      {formatDate(booking.dateFrom)} -{" "}
                      {formatDate(booking.dateTo)} , Guest(s) : {booking.guests}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default VenueManager;
