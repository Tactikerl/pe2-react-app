import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewVenue from "./ViewVenue";

const FetchedVenue = () => {
  const { id } = useParams();
  const [fetchedVenue, setFetchedVenue] = useState({});

  useEffect(() => {
    requestFetchedVenue(id);
  }, [id]);

  async function requestFetchedVenue(id) {
    const res = await fetch(
      `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );
    const json = await res.json();
    setFetchedVenue(json);
  }

  return (
    <div>
      <ViewVenue
        name={fetchedVenue.name}
        images={fetchedVenue.media}
        owner={fetchedVenue.owner}
        created={fetchedVenue.created}
        updated={fetchedVenue.updated}
        meta={fetchedVenue.meta}
        maxGuests={fetchedVenue.maxGuests}
        price={fetchedVenue.price}
      />
    </div>
  );
};

export default FetchedVenue;
