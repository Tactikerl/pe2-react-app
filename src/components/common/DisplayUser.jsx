import { Tabs, Tab, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

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
const token = sessionStorage.getItem("accessToken");

const DisplayUser = (props) => {
  const { user, userBookings, userVenues, showVenuesLink } = props;

  function formatDate(datestring) {
    const date = new Date(datestring);
    return date?.toLocaleDateString("en-US", dateOptions);
  }

  return (
    <div className="bg-info-subtle" style={{ minHeight: "100%" }}>
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
                  <h1>{user.name}</h1>
                  <img
                    src={user.avatar}
                    alt={`Profile avatar for ${user.name}`}
                    className="rounded bg-white p-3"
                    width={250}
                  />
                  <form
                    className="mb-2 mt-2"
                    onSubmit={props.handleAvatarChange}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        value={props.newAvatar}
                        className="form-control"
                        onChange={(e) => props.setNewAvatar(e.target.value)}
                        placeholder="New Avatar URL"
                        required
                      />
                      <button className="btn btn-primary" type="submit">
                        Change Avatar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body bg-warning-subtle">
                    <p>
                      <b>Email</b> : {user.email}
                    </p>
                    <p>
                      <b>Your bookings</b> : {user._count?.bookings}
                    </p>
                    <p>
                      {user.venueManager ? (
                        <b>{"Manager"}</b>
                      ) : (
                        <b>{"Customer"}</b>
                      )}
                    </p>
                    <p>
                      <b>Owned venues</b> : {user._count?.venues}
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
                <div className="card m-2 bg-success-subtle">
                  <div className="card-body">
                    <h3>{booking.venue.name}</h3>
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
              user={user.name}
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
