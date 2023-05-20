import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVenue = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="venueName">
          <input
            type="text"
            id="venueName"
            value={venueData.name}
            onChange={(e) =>
              setVenueData({ ...venueData, name: e.target.value })
            }
            placeholder="Venue Name.."
            required
          />
        </label>
        <label htmlFor="venueInfo">
          <input
            type="text"
            id="venueInfo"
            value={venueData.description}
            onChange={(e) =>
              setVenueData({ ...venueData, description: e.target.value })
            }
            placeholder="Venue Description"
            required
          />
        </label>
        <label htmlFor="venueImages">
          <input
            type="text"
            id="venueImages"
            name="venueImages"
            value={venueData.media}
            onChange={(e) =>
              setVenueData({ ...venueData, media: e.target.value })
            }
            placeholder="Paste Url for venue images here"
          />
        </label>
        <label htmlFor="venuePrice">
          Price per night in NOK
          <input
            type="number"
            name="venuePrice"
            id="venuePrice"
            value={venueData.price}
            onChange={(e) =>
              setVenueData({ ...venueData, price: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="maxGuests">
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
          />
        </label>
        <label htmlFor="venueMetaWifi">
          <input
            type="checkbox"
            name="venueMetaWifi"
            id="venueMetaWifi"
            checked={venueData.meta.wifi}
            onChange={(e) =>
              setVenueData({ ...venueData, wifi: e.target.value })
            }
          />
          Wifi
        </label>
        <label htmlFor="venueMetaParking">
          <input
            type="checkbox"
            name="venueMetaParking"
            id="venueMetaParking"
            checked={venueData.meta.parking}
            onChange={(e) =>
              setVenueData({ ...venueData, parking: e.target.value })
            }
          />
          Parking
        </label>
        <label htmlFor="venueMetaBreakfast">
          <input
            type="checkbox"
            name="venueMetaBreakfast"
            id="venueMetaBreakfast"
            checked={venueData.meta.breakfast}
            onChange={(e) =>
              setVenueData({ ...venueData, breakfast: e.target.value })
            }
          />
          Breakfast
        </label>
        <label htmlFor="venueMetaPets">
          <input
            type="checkbox"
            name="venueMetaPets"
            id="venueMetaPets"
            checked={venueData.meta.pets}
            onChange={(e) =>
              setVenueData({ ...venueData, pets: e.target.value })
            }
          />
          Pets
        </label>

        <label htmlFor="venueAddress">
          Address
          <input
            type="text"
            name="address"
            id="venueLocationAddress"
            value={venueData.location.address}
            onChange={(e) =>
              setVenueData({ ...venueData, address: e.target.value })
            }
          />
        </label>
        <label htmlFor="venueCity">
          City
          <input
            type="text"
            name="city"
            id="venueLocationCity"
            value={venueData.location.city}
            onChange={(e) =>
              setVenueData({ ...venueData, city: e.target.value })
            }
          />
        </label>
        <label htmlFor="venueZip">
          ZIP
          <input
            type="text"
            name="zip"
            id="venueLocationZip"
            value={venueData.location.zip}
            onChange={(e) =>
              setVenueData({ ...venueData, zip: e.target.value })
            }
          />
        </label>
        <label htmlFor="venueCountry">
          Country
          <input
            type="text"
            name="country"
            id="venueLocationCountry"
            value={venueData.location.country}
            onChange={(e) =>
              setVenueData({ ...venueData, country: e.target.value })
            }
          />
        </label>
        <label htmlFor="venueLat">
          Latitude
          <input
            type="number"
            name="lat"
            id="venueLocationLat"
            value={venueData.location.lat}
            onChange={(e) =>
              setVenueData({ ...venueData, lat: e.target.value })
            }
          />
        </label>
        <label htmlFor="venueLng">
          Longitude
          <input
            type="number"
            name="lng"
            id="venueLocationLng"
            value={venueData.location.lng}
            onChange={(e) =>
              setVenueData({ ...venueData, lng: e.target.value })
            }
          />
        </label>

        <button type="submit">Update Venue</button>
      </form>
    </div>
  );
};

export default EditVenue;
