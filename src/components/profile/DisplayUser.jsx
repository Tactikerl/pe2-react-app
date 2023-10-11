import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import Avatar from "./Avatar";
import profileFiller from "../../assets/img/profile-filler.jpg";
import VenueManager from "./VenueManager";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const DisplayUser = (props) => {
  const { user } = useContext(UserContext);
  const token = user.accessToken;
  const { userData, userBookings, userVenues, showVenuesLink } = props;

  function formatDate(datestring) {
    const date = new Date(datestring);
    return date?.toLocaleDateString("en-US", dateOptions);
  }

  return (
    <div className="bg-blue" style={{ minHeight: "100%" }}>
      <Tabs
        defaultActiveKey="profile"
        id="user-tabs"
        className="mb-3 bg-light"
        fill
        style={{ "--bs-nav-tabs-link-active-bg": "#cff4fc" }}
      >
        <Tab eventKey="profile" title="Profile">
          <>
            <div className="row pe-2 ps-2">
              <div className="col-md-6">
                <div>
                  <h1>{userData.name}</h1>

                  <Avatar
                    avatar={userData.avatar}
                    name={userData.name}
                    updateCallback={props.handleAvatarChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body bg-yellow">
                    <p>
                      <b>Email</b> : {userData.email}
                    </p>
                    <p>
                      <b>Your bookings</b> : {userData._count?.bookings}
                    </p>
                    <p>
                      {userData.venueManager ? (
                        <b>{"Manager"}</b>
                      ) : (
                        <b>{"Customer"}</b>
                      )}
                    </p>
                    <p>
                      <b>Owned venues</b> : {userData._count?.venues}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <img
                src={profileFiller}
                className="object-fit-cover opacity-25 d-none d-md-block"
                style={{ height: "calc(100vh - 444px)" }}
              />
            </div>
          </>
        </Tab>
        <Tab eventKey="bookings" title="Bookings">
          <>
            {userBookings.map((booking) => (
              <div key={booking.id}>
                <div className="card m-2 bg-alt">
                  <div className="card-body">
                    <Link to={`/venues/${booking.venue.id}`}>
                      {" "}
                      <h3>{booking.venue.name}</h3>
                    </Link>
                    <p>
                      <b>Your Check Inn date</b> :{" "}
                      {formatDate(booking.dateFrom)}.
                    </p>
                    <p>
                      <b>Your Check Out date</b> : {formatDate(booking.dateTo)}.
                    </p>
                    <p>
                      <b>Booked for</b> : {booking.guests} Guest(s).
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        </Tab>
        {showVenuesLink && (
          <Tab eventKey="venues" title="Your Venues">
            <VenueManager
              user={userData.name}
              userVenues={userVenues}
              token={token}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default DisplayUser;
