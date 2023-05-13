import { useEffect, useState } from "react";
import DisplayVenues from "../venue/DisplayVenues";
import UserParams from "./UserParams";

const url = `https://nf-api.onrender.com/api/v1/holidaze/venues?_owner=true&_bookings=true`;

const VenueParams = () => {
  const [fetchVenues, setFetchVenues] = useState([]);
  const [venueSearch, setVenueSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function requestFetchVenues() {
      try {
        setHasError(false);
        setIsLoading(true);
        const res = await fetch(url);
        const contentType = res.headers.get(`Content-Type`);
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          setFetchVenues(json);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setHasError(true);
          throw new Error("Response is not in JSON format");
        }
      } catch (error) {
        console.error(error);
      }
    }
    requestFetchVenues();
  }, []);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (hasError) {
    return <div>Error Loading Data</div>;
  }

  return (
    <div>
      <form>
        <label htmlFor="venueSearch">
          <input
            type="text"
            id="venueSearch"
            value={venueSearch}
            onChange={(e) => {
              setVenueSearch(e.target.value);
            }}
            placeholder="Type to start search"
          />
        </label>
        <button>Search</button>
      </form>
      <div>
        <UserParams />
      </div>
      <div className="venue-list">
        {fetchVenues
          .filter((venues) =>
            venues.name.toLowerCase().includes(venueSearch.toLowerCase())
          )
          .map((venue) => (
            <DisplayVenues
              id={venue.id}
              key={venue.id}
              name={venue.name}
              owner={venue.owner.name}
              description={venue.description}
              maxGuests={venue.maxGuests}
              price={venue.price}
            />
          ))}
      </div>
    </div>
  );
};

export default VenueParams;
