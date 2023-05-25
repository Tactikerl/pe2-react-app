import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVenue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const imageElement = useRef("");
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
    fetchVenueData(id);
  }, [id]);

  async function fetchVenueData(id) {
    try {
      const res = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`
      );
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

    const token = sessionStorage.getItem("accessToken");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    };

    try {
      const res = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`,
        requestOptions
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      console.log("Venue update successful!");

      navigate(`/venues/${id}`);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleVenueImages = (image) => {
    setVenueData((venueData) => ({
      ...venueData,
      media: [...venueData.media, image],
    }));
  };

  return (
    <div className="container-fluid justify-content-center">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6">
          <label className="form-label w-100">
            <input
              type="text"
              id="venueName"
              value={venueData.name}
              onChange={(e) =>
                setVenueData({ ...venueData, name: e.target.value })
              }
              className="form-control"
              required
            />
          </label>
          <label className="form-label w-100">
            <input
              type="text"
              id="venueInfo"
              value={venueData.description}
              onChange={(e) =>
                setVenueData({ ...venueData, description: e.target.value })
              }
              className="form-control"
              required
            />
          </label>

          <label className="form-label w-100">
            Price per night in NOK
            <input
              type="number"
              name="venuePrice"
              id="venuePrice"
              value={venueData.price}
              onChange={(e) =>
                setVenueData({ ...venueData, price: e.target.value })
              }
              className="form-control"
              required
            />
          </label>
          <label className="form-label w-100">
            Number of Guests?
            <input
              type="number"
              name="maxGuests"
              id="maxGuests"
              value={venueData.maxGuests}
              onChange={(e) =>
                setVenueData({ ...venueData, maxGuests: e.target.value })
              }
              required
              className="form-control"
            />
          </label>
          <label className="form-label w-100">
            Address
            <input
              type="text"
              name="address"
              id="venueLocationAddress"
              className="form-control"
              value={venueData.location.address}
              onChange={(e) =>
                setVenueData({ ...venueData, address: e.target.value })
              }
            />
          </label>
          <label className="form-label w-100">
            City
            <input
              type="text"
              name="city"
              id="venueLocationCity"
              className="form-control"
              value={venueData.location.city}
              onChange={(e) =>
                setVenueData({ ...venueData, city: e.target.value })
              }
            />
          </label>
          <label className="form-label w-100">
            ZIP
            <input
              type="text"
              name="zip"
              id="venueLocationZip"
              className="form-control"
              value={venueData.location.zip}
              onChange={(e) =>
                setVenueData({ ...venueData, zip: e.target.value })
              }
            />
          </label>
          <label className="form-label w-100">
            Country
            <input
              type="text"
              name="country"
              id="venueLocationCountry"
              className="form-control"
              value={venueData.location.country}
              onChange={(e) =>
                setVenueData({ ...venueData, country: e.target.value })
              }
            />
          </label>
          <label className="form-label w-100">
            Latitude
            <input
              type="number"
              name="lat"
              id="venueLocationLat"
              value={venueData.location.lat}
              className="form-control"
              onChange={(e) =>
                setVenueData({ ...venueData, lat: e.target.value })
              }
            />
          </label>
          <label className="form-label w-100">
            Longitude
            <input
              type="number"
              name="lng"
              id="venueLocationLng"
              className="form-control"
              value={venueData.location.lng}
              onChange={(e) =>
                setVenueData({ ...venueData, lng: e.target.value })
              }
            />
          </label>
          <button type="submit">Update Venue</button>
        </div>
        <div className="col-md-6">
          <div>
            {venueData.media.map((imageElement, index) => (
              <div key={index}>{imageElement}</div>
            ))}
            <label className="form-label w-100">
              <div className="input-group">
                <input type="url" ref={imageElement} className="form-control" />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleVenueImages(imageElement.current.value)}
                >
                  Add
                </button>
              </div>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Wifi
              <input
                type="checkbox"
                name="venueMetaWifi"
                id="venueMetaWifi"
                className="form-check-input"
                checked={venueData.meta.wifi}
                onChange={(e) =>
                  setVenueData({ ...venueData, wifi: e.target.value })
                }
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Parking
              <input
                type="checkbox"
                name="venueMetaParking"
                id="venueMetaParking"
                className="form-check-input"
                checked={venueData.meta.parking}
                onChange={(e) =>
                  setVenueData({ ...venueData, parking: e.target.value })
                }
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Breakfast
              <input
                type="checkbox"
                name="venueMetaBreakfast"
                id="venueMetaBreakfast"
                className="form-check-input"
                checked={venueData.meta.breakfast}
                onChange={(e) =>
                  setVenueData({ ...venueData, breakfast: e.target.value })
                }
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Pets
              <input
                type="checkbox"
                name="venueMetaPets"
                id="venueMetaPets"
                className="form-check-input"
                checked={venueData.meta.pets}
                onChange={(e) =>
                  setVenueData({ ...venueData, pets: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVenue;
