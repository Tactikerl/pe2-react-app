import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import dollar from "../../assets/icons/dollar-sign.svg";
import users from "../../assets/icons/users.svg";
import breakfast from "../../assets/icons/breakfast.svg";
import pets from "../../assets/icons/pawprint.png";
import parking from "../../assets/icons/parking.svg";
import wifi from "../../assets/icons/wifi.svg";
import { useEffect, useState } from "react";
import { API_BOOKINGS_TRUE, API_PROFILES, API_HEADERS } from "../utils/url";

const icons = {
  breakfast,
  pets,
  parking,
  wifi,
};

const VenueManager = ({ user, token }) => {
  const [managerData, setManagerData] = useState([]);
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
  }, []);

  function formatDate(date) {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  }
  return (
    <>
      {managerData?.map((venue) => (
        <div key={venue.id}>
          <div className="card m-2 bg-danger-subtle">
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
              {Object.keys(venue?.meta || {}).map((key) =>
                venue.meta[key] ? (
                  <Badge
                    bg="info"
                    className="fs-3 text-bg-info me-2 mb-2"
                    key={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                    {<img height={25} width={25} src={icons[key]}></img>}
                  </Badge>
                ) : null
              )}
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
