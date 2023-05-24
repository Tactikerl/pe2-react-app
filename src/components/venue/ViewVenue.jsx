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
    <div className="">
      <h1>{props.name}</h1>

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
                <img src={user}></img> Host: {props.owner?.name}
              </p>
              <p>
                {" "}
                <img src={home}></img> Address: {props.location?.address}
              </p>
              <p>
                {" "}
                <img src={pin}></img> City: {props.location?.city}
              </p>
              <p>
                {" "}
                <img src={flag}></img> Country: {props.location?.country}
              </p>
              <p>
                {" "}
                <img src={users}></img> Guest Capacity : {props.maxGuests}
              </p>
              <p>
                {" "}
                <img src={dollar}></img> Price : {props.price},- NOK{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVenue;
