function DisplayVenues(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.owner}</p>
      <p>Guest Capacity : {props.maxGuests}</p>
      <p>Price : {props.price},- NOK </p>
    </div>
  );
}

export default DisplayVenues;
