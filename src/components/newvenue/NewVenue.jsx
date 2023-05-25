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
    <div className="container-fluid justify-content-center">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <label className="form-label w-100">
            Venue Name:
            <input
              type="text"
              value={venueName}
              id="venueName"
              onChange={(e) => setVenueName(e.target.value)}
              required
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            Description of the Venue
            <input
              type="textarea"
              value={venueInfo}
              id="venueInfo"
              onChange={(e) => setVenueInfo(e.target.value)}
              className="form-control"
              required
            />
          </label>
          <label className="form-label w-100">
            Address
            <input
              type="text"
              value={venueLocation.address}
              name="address"
              onChange={(e) => handleLocationChange(e)}
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            City
            <input
              type="text"
              value={venueLocation.city}
              name="city"
              onChange={(e) => handleLocationChange(e)}
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            ZIP
            <input
              type="text"
              value={venueLocation.zip}
              name="zip"
              onChange={(e) => handleLocationChange(e)}
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            Country
            <input
              type="text"
              value={venueLocation.country}
              name="country"
              onChange={(e) => handleLocationChange(e)}
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            Latitude
            <input
              type="number"
              value={venueLocation.lat}
              name="lat"
              onChange={(e) => handleLocationChange(e)}
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            Longitude
            <input
              type="number"
              value={venueLocation.lng}
              name="lng"
              onChange={(e) => handleLocationChange(e)}
              className="form-control"
            />
          </label>

          <label className="form-label w-100">
            Price per night in NOK
            <input
              type="number"
              value={venuePrice}
              className="form-control"
              onChange={(e) => setVenuePrice(e.target.value)}
              required
            />
          </label>
          <label className="form-label w-100">
            Number of Guests?
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="form-control"
              required
            />
          </label>
        </div>
        <div className="col-md-6">
          <div>
            {venueImages.map((imageElement, index) => (
              <div key={index}>{imageElement}</div>
            ))}
            <label className="form-label w-100">
              Add image url
              <div className="input-group">
                <input type="url" ref={imageElement} className="form-control" />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleVenueImages(imageElement.current.value);
                  }}
                >
                  Add
                </button>
              </div>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Wifi?
              <input
                type="checkbox"
                checked={venueMeta.wifi}
                onChange={() => handleMetaChange("wifi")}
                className="form-check-input"
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Parking?
              <input
                type="checkbox"
                checked={venueMeta.parking}
                className="form-check-input"
                onChange={() => handleMetaChange("parking")}
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Breakfast?
              <input
                type="checkbox"
                checked={venueMeta.breakfast}
                onChange={() => handleMetaChange("breakfast")}
                className="form-check-input"
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Pets?
              <input
                type="checkbox"
                checked={venueName.pets}
                onChange={() => handleMetaChange("pets")}
                className="form-check-input"
              />
            </label>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Create Venue
        </button>
      </form>
    </div>
  );
};

export default NewVenue;
