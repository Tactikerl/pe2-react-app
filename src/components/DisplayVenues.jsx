import { Link } from "react-router-dom";

function DisplayVenues(props) {
  return (
    <div>
      <hr></hr>
      <Link to={`/venues/${props.id}`}>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <p>Owner : {props.owner}</p>
        <p>Guest Capacity : {props.maxGuests}</p>
        <p>Price : {props.price},- NOK </p>
      </Link>
    </div>
  );
}

export default DisplayVenues;
