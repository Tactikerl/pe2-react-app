import { Badge, Button } from "react-bootstrap";
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
import userMinus from "../../assets/icons/user-minus.svg";
import userPlus from "../../assets/icons/user-plus.svg";
import Rating from "../common/Rating";

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
        <Rating rating={props.rating} />
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
      <div className="row">
        <div className="col-lg-8 d-flex gap-3">
          <div className="">{props.bookingComponent}</div>
          <div className="flex-grow-1">
            <h2>Book a stay at {props.name} </h2>
            <div>
              <label htmlFor="guestNumbr">
                <b>Book for how many guests?</b> <br />
                <p>Max capacity {props.maxGuests}</p>
              </label>
              <div className="input-group" style={{ maxWidth: "127px" }}>
                <button
                  className="btn btn-primary pe-1 ps-1"
                  onClick={() =>
                    props.handleGuestNumberChange(props.guests - 1)
                  }
                >
                  <img src={userMinus} alt="" />
                </button>
                <input
                  type="number"
                  className="form-control"
                  id="guestNumbr"
                  min="1"
                  max={props.maxGuests}
                  value={props.guests}
                  onChange={props.handleGuestNumberChange}
                />
                <button
                  className="btn btn-primary pe-1 ps-1"
                  onClick={() =>
                    props.handleGuestNumberChange(props.guests + 1)
                  }
                >
                  <img src={userPlus} alt="" />
                </button>
              </div>
            </div>
            {props.bookingButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVenue;
