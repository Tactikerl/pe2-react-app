import { useEffect, useState } from "react";
import DisplayVenues from "./DisplayVenues";
import { API_VENUES_PGN } from "../utils/url";
import { Button } from "react-bootstrap";
import "../../../src/custom.scss";

const VenueList = () => {
  const [fetchVenues, setFetchVenues] = useState([]);
  const [venueSearch, setVenueSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function requestFetchVenues() {
      try {
        setHasError(false);
        setIsLoading(true);
        const res = await fetch(API_VENUES_PGN + currentPage * 10);
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
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (hasError) {
    return <div>Error Loading Data</div>;
  }

  return (
    <div className="container justify-content-center">
      <form className="justify-content-center d-flex">
        <div className="input-group">
          <input
            type="text"
            id="venueSearch"
            value={venueSearch}
            onChange={(e) => {
              setVenueSearch(e.target.value);
            }}
            placeholder="Type to start search"
            className="form-control"
            aria-label="Search for venues"
          />
          <Button variant="secondary">Search</Button>
        </div>
      </form>

      <div className="venue-list">
        {fetchVenues
          .filter((venues) =>
            venues.name.toLowerCase().includes(venueSearch.toLowerCase())
          )
          .map((venue) => (
            <DisplayVenues
              id={venue.id}
              key={venue.id}
              image={venue.media}
              name={venue.name}
              owner={venue.owner.name}
              description={venue.description}
              maxGuests={venue.maxGuests}
              price={venue.price}
              rating={venue.rating}
              meta={venue.meta}
            />
          ))}
      </div>
      <div>
        <nav aria-label="Venue list navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button
                onClick={() =>
                  currentPage > 0 && setCurrentPage(currentPage - 1)
                }
                className="page-link"
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <span className="page-link active">{currentPage + 1}</span>
            </li>
            <li className="page-item">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="page-link"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default VenueList;
