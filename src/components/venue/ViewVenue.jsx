const ViewVenue = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.owner?.name}</p>
      <img src={props.images} alt={props.name} />

      <p>{props.created}</p>
      <p>{props.updated}</p>
      <p>{props.meta?.wifi}</p>
      <p>Guest Capacity : {props.maxGuests}</p>
      <p>Price : {props.price},- NOK </p>
    </div>
  );
};

export default ViewVenue;
