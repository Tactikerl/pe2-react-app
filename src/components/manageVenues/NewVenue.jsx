import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_CREATE } from "../utils/url";
import VenueFields from "./VenueFields";

const NewVenue = () => {
  const navigate = useNavigate();

  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 1,
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

  const handleVenueImages = (image) => {
    if (image.length > 0) {
      setVenueData((venueData) => ({
        ...venueData,
        media: [...venueData.media, image],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("accessToken");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    try {
      const res = await fetch(`${API_CREATE}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(venueData),
      });
      console.log(venueData);

      if (!res.ok) {
        throw Error(`HTTP error! status: ${res.status}`);
      }

      console.log("Venue creation successfull!");

      const venue = await res.json();
      navigate(`/venues/${venue.id}`);
    } catch (error) {
      console.error("Error creating Venue;", error);
    }
  };

  return (
    <div className="container-fluid rounded justify-content-center bg-danger-subtle rounded">
      <form onSubmit={handleSubmit} className="row">
        <h1>Create a new Venue</h1>
        <VenueFields
          venueData={venueData}
          setVenueData={setVenueData}
          handleVenueImages={handleVenueImages}
        />

        <div className="col-md-6 mb-3">
          <button className="btn btn-primary" type="submit">
            Create Venue
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVenue;
