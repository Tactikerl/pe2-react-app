import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewVenue = () => {
  const navigate = useNavigate();
  const [venueName, setVenueName] = useState("");
  const [venueInfo, setVenueInfo] = useState("");
  const [venueImages, setVenueImages] = useState([]);
  const [venuePrice, setVenuePrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const handleVenueImages = (image) => {
    setVenueImages((prevImages) => [...prevImages, image]);
  };
  const imageElement = useRef("");
  const [venueMeta, setVenueMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [venueLocation, setVenueLocation] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
    lat: 0,
    lng: 0,
  });

  const handleMetaChange = (metaKey) => {
    setVenueMeta((prevState) => ({
      ...prevState,
      [metaKey]: !prevState[metaKey],
    }));
  };

  function handleLocationChange(e) {
    const { name, value } = e.target;
    setVenueLocation((prevLocation) => ({
      ...prevLocation,
      [name]: name === "lat" || name === "lng" ? parseFloat(value) : value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venueData = {
      name: venueName,
      description: venueInfo,
      media: venueImages,
      price: parseInt(venuePrice),
      maxGuests: parseInt(maxGuests),
      meta: venueMeta,
      location: venueLocation,
    };
    const token = sessionStorage.getItem("accessToken");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    try {
      const res = await fetch(
        "https://nf-api.onrender.com/api/v1/holidaze/venues",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(venueData),
        }
      );
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span aria-hidden="true">VenueName:</span>
          <input
            aria-label="VenueName"
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Venue Name.."
            required
          />
        </label>
        <label>
          <span aria-hidden="true"></span>
          <input
            type="text"
            value={venueInfo}
            onChange={(e) => setVenueInfo(e.target.value)}
            placeholder="Venue Description"
            required
          />
        </label>
        <div>
          {venueImages.map((imageElement, index) => (
            <div key={index}>{imageElement}</div>
          ))}
          <label>
            Add image url
            <span aria-hidden="true"></span>
            <input
              type="text"
              ref={imageElement}
              placeholder="Paste Url for venue images here"
            />
            <button
              onClick={() => {
                handleVenueImages(imageElement.current.value);
              }}
            >
              Add
            </button>
          </label>
        </div>
        <label>
          Price per night in NOK
          <span aria-hidden="true"></span>
          <input
            type="number"
            value={venuePrice}
            onChange={(e) => setVenuePrice(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Guests?
          <span aria-hidden="true"></span>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
        </label>
        <label>
          <span aria-hidden="true"></span>
          <input
            type="checkbox"
            checked={venueMeta.wifi}
            onChange={() => handleMetaChange("wifi")}
          />
          Wifi
        </label>
        <label>
          <span aria-hidden="true"></span>
          <input
            type="checkbox"
            checked={venueMeta.parking}
            onChange={() => handleMetaChange("parking")}
          />
          Parking
        </label>
        <label>
          <span aria-hidden="true"></span>
          <input
            type="checkbox"
            checked={venueMeta.breakfast}
            onChange={() => handleMetaChange("breakfast")}
          />
          Breakfast
        </label>
        <label>
          <span aria-hidden="true"></span>
          <input
            type="checkbox"
            checked={venueName.pets}
            onChange={() => handleMetaChange("pets")}
          />
          Pets
        </label>
        <label>
          Address
          <span aria-hidden="true"></span>
          <input
            type="text"
            value={venueLocation.address}
            onChange={handleLocationChange}
          />
        </label>
        <label>
          City
          <span aria-hidden="true"></span>
          <input
            type="text"
            value={venueLocation.city}
            onChange={handleLocationChange}
          />
        </label>
        <label>
          ZIP
          <span aria-hidden="true"></span>
          <input
            type="text"
            value={venueLocation.zip}
            onChange={handleLocationChange}
          />
        </label>
        <label>
          Country
          <span aria-hidden="true"></span>
          <input
            type="text"
            value={venueLocation.country}
            onChange={handleLocationChange}
          />
        </label>
        <label>
          Latitude
          <span aria-hidden="true"></span>
          <input
            type="number"
            value={venueLocation.lat}
            onChange={handleLocationChange}
          />
        </label>
        <label>
          Longitude
          <span aria-hidden="true"></span>
          <input
            type="number"
            value={venueLocation.lng}
            onChange={handleLocationChange}
          />
        </label>

        <button type="submit">Create Venue</button>
      </form>
    </div>
  );
};

export default NewVenue;
