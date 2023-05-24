import { Badge } from "react-bootstrap";
import breakfast from "../../assets/icons/breakfast.svg";
import pets from "../../assets/icons/pawprint.png";
import parking from "../../assets/icons/parking.svg";
import wifi from "../../assets/icons/wifi.svg";
import flag from "../../assets/icons/flag.svg";
import home from "../../assets/icons/home.svg";
import users from "../../assets/icons/users.svg";
import user from "../../assets/icons/user.svg";
import pin from "../../assets/icons/map-pin.svg";
import dollar from "../../assets/icons/dollar-sign.svg";
import placeholder from "../../assets/img/placeholder.png";

const icons = {
  breakfast,
  pets,
  parking,
  wifi,
};
const ViewVenue = (props) => {
  return (
    <div className="bg-info-subtle p-2">
      <div className="row">
        <h1>{props.name}</h1>
        <div className="d-flex">
          {Array(Math.round(props.rating))
            .fill("")
            .map((x, index) => (
              <div
                className="border rounded border-secondary bg-light mb-2 me-1"
                key={index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="#e8b923"
                  stroke="#e8b923"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            ))}
        </div>
      </div>

      <div className="venue-image-grid w-100">
        {props.images
          ?.slice(0, 9)
          .concat(Array(Math.max(0, 9 - props.images.length)).fill(placeholder))
          .map((image, index) => (
            <img
              key={index}
              className={"img" + (index + 1)}
              src={image}
              alt={props.name}
            />
          ))}
      </div>
      <div className="row mt-3">
        <div className="col-md-8">
          {Object.keys(props.meta || {}).map((key) =>
            props.meta[key] ? (
              <Badge
                bg="info"
                className="fs-3 text-bg-info me-2 mb-2"
                key={key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {<img height={50} width={50} src={icons[key]}></img>}
              </Badge>
            ) : null
          )}
          <p className="mt-2 fs-5">{props.description}</p>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning-subtle">
            <div className="card-body">
              <p>
                <img src={user}></img> <b>Host</b>: {props.owner?.name}
              </p>
              <p>
                {" "}
                <img src={home}></img> <b>Address</b>: {props.location?.address}
              </p>
              <p>
                {" "}
                <img src={pin}></img> <b>City</b>: {props.location?.city}
              </p>
              <p>
                {" "}
                <img src={flag}></img> <b>Country</b>: {props.location?.country}
              </p>
              <p>
                {" "}
                <img src={users}></img> <b>Guest Capacity</b>: {props.maxGuests}
              </p>
              <p>
                {" "}
                <img src={dollar}></img> <b>Price</b>: {props.price},- NOK{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-2 ">{props.bookingComponent}</div>
        <div className="col-md-10">
          <div>
            <label htmlFor="guestNumbr">
              <b>Number of guests</b>
            </label>
            <input
              type="number"
              className="form-control"
              id="guestNumbr"
              placeholder="Number of guests"
              min="1"
              max={props.maxGuests}
              value={props.guests}
              onChange={props.handleGuestNumberChange}
            />
          </div>
          {props.bookingButton}
        </div>
      </div>
    </div>
  );
};

export default ViewVenue;
