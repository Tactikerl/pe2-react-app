import { useEffect, useState } from "react";
import DisplayVenues from "./DisplayVenues";
import { API_VENUES_SRT } from "../utils/url";
import { Button } from "react-bootstrap";
import "../../../src/custom.scss";

const sorting = [
  { sort: "name", order: "asc", label: "Name" },
  { sort: "price", order: "asc", label: "Price" },
  { sort: "maxGuests", order: "desc", label: "Capacity" },
  { sort: "rating", order: "desc", label: "Rating" },
];

const VenueList = ({ title }) => {
  const [fetchVenues, setFetchVenues] = useState([]);
  const [venueSearch, setVenueSearch] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [sortParam, setSortParam] = useState(sorting[0]);

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function requestFetchVenues() {
      try {
        setHasError(false);
        setIsLoading(true);
        const res = await fetch(
          API_VENUES_SRT(10, 10 * currentPage, sortParam.sort, sortParam.order)
        );

        const contentType = res.headers.get(`Content-Type`);
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          setFetchVenues((prevState) => {
            let newList = [...prevState, ...json];
            let uniqueList = newList.filter(
              (item, index) =>
                newList.findIndex((item2) => item2.id === item.id) === index
            );

            return uniqueList;
          });

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
  }, [currentPage, sortParam]);

  if (hasError) {
    return <div>Error Loading Data</div>;
  }

  return (
    <div className="container justify-content-center">
      <form className="row mt-2">
        <div className="col-md-8 mb-2">
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
            <Button
              type="button"
              variant="secondary"
              className="bg-blue text-dark"
            >
              Search
            </Button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="">
            <label className="d-flex gap-1 align-items-center">
              <span className="text-nowrap">Sort by:</span>
              <select
                className="form-select"
                name="sort"
                id="sort"
                onChange={(e) => {
                  setSortParam(sorting[e.target.value]);
                  setFetchVenues([]);
                  setCurrentPage(0);
                }}
              >
                {sorting.map((sort, index) => (
                  <option key={sort.sort} value={index}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </form>

      <div className="venue-list">
        {fetchVenues
          .filter(
            (venues) =>
              venues.name.toLowerCase().includes(venueSearch.toLowerCase()) ||
              venues.location.country
                .toLowerCase()
                .includes(venueSearch.toLowerCase()) ||
              venues.location.city
                .toLowerCase()
                .includes(venueSearch.toLowerCase()) ||
              venues.description
                .toLowerCase()
                .includes(venueSearch.toLowerCase())
          )
          .map((venue) => (
            <DisplayVenues
              id={venue.id}
              key={venue.id + currentPage}
              image={venue.media[0]}
              name={venue.name}
              owner={venue.owner}
              description={venue.description}
              maxGuests={venue.maxGuests}
              price={venue.price}
              rating={venue.rating}
              meta={venue.meta}
              location={venue.location}
            />
          ))}
      </div>
      <div>
        <nav aria-label="Venue list navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="page-link"
              >
                Back to Top
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
                Load more venues
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default VenueList;
