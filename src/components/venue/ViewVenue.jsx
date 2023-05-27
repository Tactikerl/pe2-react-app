import placeholder from "../../assets/img/placeholder.png";
import userMinus from "../../assets/icons/user-minus.svg";
import userPlus from "../../assets/icons/user-plus.svg";
import Rating from "../common/Rating";
import Facilities from "../common/Facilities";
import VenueAttributes from "../common/VenueAttributes";

const ViewVenue = (props) => {
  function calculateDays(start, end) {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  let days = calculateDays(props.startDate, props.endDate);

  return (
    <div className="bg-info-subtle p-2">
      <div className="row">
        <h1>
          {props.name}, {props.location?.city}
        </h1>
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
        <div className="col-lg-7">
          <Facilities meta={props.meta} />
          <p className="mt-2 fs-5">{props.description}</p>
          <div className="card bg-warning-subtle">
            <div className="card-body">
              <VenueAttributes
                owner={props.owner}
                location={props.location}
                maxGuests={props.maxGuests}
                price={props.price}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5  ">
          <div className="bg-light d-flex flex-column align-items-center gap-1 p-3 rounded">
            <h2 className="fs-4">
              <b>{props.price} NOK</b> /night
            </h2>
            <div className="">{props.bookingComponent}</div>

            <label
              htmlFor="guestNumbr"
              className="
            align-self-start"
            >
              <b>Guests</b> <br />
            </label>
            <div className="input-group">
              <button
                className="btn btn-primary "
                onClick={() =>
                  props.guests > 1 &&
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
                className="btn btn-primary"
                onClick={() => props.handleGuestNumberChange(props.guests + 1)}
              >
                <img src={userPlus} alt="" />
              </button>
            </div>
            <div className="align-self-start">
              <p className="text-dark text-opacity-50">
                Max capacity {props.maxGuests}
              </p>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div>
                {props.price}NOK x {days} nights
              </div>
              <div>
                Total <b>{days * props.price} NOK</b>
              </div>
            </div>
            {props.userLoggedIn && (
              <button
                disabled={days === 0}
                className="btn btn-primary mt-2 w-100"
                onClick={props.CreateBooking}
              >
                Book now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVenue;
