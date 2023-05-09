import { useState } from "react";
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
      media: [venueImages],
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
        <label htmlFor="venueName">
          <input
            type="text"
            id="venueName"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Venue Name.."
            required
          />
        </label>
        <label htmlFor="venueInfo">
          <input
            type="text"
            id="venueInfo"
            value={venueInfo}
            onChange={(e) => setVenueInfo(e.target.value)}
            placeholder="Venue Description"
            required
          />
        </label>
        <label htmlFor="venueImages">
          <input
            type="text"
            id="venueImages"
            name="venueImages"
            value={venueImages}
            onChange={(e) => setVenueImages(e.target.value)}
            placeholder="Paste Url for venue images here"
          />
        </label>
        <label htmlFor="venuePrice">
          Price per night in NOK
          <input
            type="number"
            name="venuePrice"
            id="venuePrice"
            value={venuePrice}
            onChange={(e) => setVenuePrice(e.target.value)}
            required
          />
        </label>
        <label htmlFor="maxGuests">
          Number of Guests?
          <input
            type="number"
            name="maxGuests"
            id="maxGuests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
        </label>
        <label htmlFor="venueMetaWifi">
          <input
            type="checkbox"
            name="venueMetaWifi"
            id="venueMetaWifi"
            checked={venueMeta.wifi}
            onChange={() => handleMetaChange("wifi")}
          />
          Wifi
        </label>
        <label htmlFor="venueMetaParking">
          <input
            type="checkbox"
            name="venueMetaParking"
            id="venueMetaParking"
            checked={venueMeta.parking}
            onChange={() => handleMetaChange("parking")}
          />
          Parking
        </label>
        <label htmlFor="venueMetaBreakfast">
          <input
            type="checkbox"
            name="venueMetaBreakfast"
            id="venueMetaBreakfast"
            checked={venueMeta.breakfast}
            onChange={() => handleMetaChange("breakfast")}
          />
          Breakfast
        </label>
        <label htmlFor="venueMetaPets">
          <input
            type="checkbox"
            name="venueMetaPets"
            id="venueMetaPets"
            checked={venueName.pets}
            onChange={() => handleMetaChange("pets")}
          />
          Pets
        </label>

        <label htmlFor="venueAddress">
          Address
          <input
            type="text"
            name="address"
            id="venueLocationAddress"
            value={venueLocation.address}
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="venueCity">
          City
          <input
            type="text"
            name="city"
            id="venueLocationCity"
            value={venueLocation.city}
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="venueZip">
          ZIP
          <input
            type="text"
            name="zip"
            id="venueLocationZip"
            value={venueLocation.zip}
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="venueCountry">
          Country
          <input
            type="text"
            name="country"
            id="venueLocationCountry"
            value={venueLocation.country}
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="venueLat">
          Latitude
          <input
            type="number"
            name="lat"
            id="venueLocationLat"
            value={venueLocation.lat}
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="venueLng">
          Longitude
          <input
            type="number"
            name="lng"
            id="venueLocationLng"
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
