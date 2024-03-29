import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_FETCH_VENUE } from "../utils/url";
import VenueFields from "./VenueFields";
import { handlingServerError } from "../utils/API";
import { UserContext } from "../utils/UserContext";

const EditVenue = ({ title }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVenueData(id);
  }, [id]);

  async function fetchVenueData(id) {
    try {
      const res = await fetch(`${API_FETCH_VENUE}${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch venue data. Status: ${res.status}`);
      }
      const venue = await res.json();
      setVenueData(venue);
    } catch (error) {
      console.error("Error fetching venue data:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = user.accessToken;

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    };

    try {
      const res = await fetch(`${API_FETCH_VENUE}${id}`, requestOptions);
      await handlingServerError(res);
      console.log("Venue update successful!");

      navigate(`/venues/${id}`);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleVenueImages = (image) => {
    if (image.length > 0) {
      setVenueData((venueData) => ({
        ...venueData,
        media: [...venueData.media, image],
      }));
    }
  };

  return (
    <div className="container-fluid justify-content-center bg-alt rounded">
      <h1>Edit venue</h1>
      <form onSubmit={handleSubmit} className="row">
        <VenueFields
          venueData={venueData}
          setVenueData={setVenueData}
          handleVenueImages={handleVenueImages}
        />
        <div className="col-md-6 mb-3">
          <button className="btn bg-blue" type="submit">
            Update Venue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVenue;
