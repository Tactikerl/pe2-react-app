import flag from "../../assets/icons/flag.svg";
import home from "../../assets/icons/home.svg";
import users from "../../assets/icons/users.svg";
import user from "../../assets/icons/user.svg";
import pin from "../../assets/icons/map-pin.svg";
import dollar from "../../assets/icons/dollar-sign.svg";

const VenueAttributes = ({ owner, location, maxGuests, price, inactive }) => {
  return (
    <>
      {!inactive?.host && (
        <p>
          <img src={user}></img> <b>Host</b>: {owner?.name}
        </p>
      )}
      {!inactive?.address && (
        <p>
          {" "}
          <img src={home}></img> <b>Address</b>: {location?.address}
        </p>
      )}
      {!inactive?.city && (
        <p>
          {" "}
          <img src={pin}></img> <b>City</b>: {location?.city}
        </p>
      )}
      {!inactive?.country && (
        <p>
          {" "}
          <img src={flag}></img> <b>Country</b>: {location?.country}
        </p>
      )}
      {!inactive?.capacity && (
        <p>
          {" "}
          <img src={users}></img> <b>Guest Capacity</b>: {maxGuests}
        </p>
      )}
      {!inactive?.price && (
        <p>
          {" "}
          <img src={dollar}></img> <b>Price</b>: {price},- NOK a night{" "}
        </p>
      )}
    </>
  );
};

export default VenueAttributes;
