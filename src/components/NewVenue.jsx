import { useState } from "react";

const NewVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [venueInfo, setVenueInfo] = useState("");
  const [venueImages, setVenueImages] = useState([]);
  const [venuePrice, setVenuePrice] = useState();
  const [maxGuests, setMaxGuests] = useState();
  const [formState, setFormState] = useState({
    venueName: "",
    venueInfo: "",
    venueImages: [],
    venuePrice: 0,
  });
  const [venueMeta, setVenueMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const handleMetaChange = (venueMeta) => {
    setVenueMeta((prevState) => ({
      ...prevState,
      [venueMeta]: !prevState[venueMeta],
    }));
  };

  return (
    <div>
      <form>
        <label htmlFor="venueName">
          <input
            type="text"
            id="venueName"
            value={venueName}
            placeholder="Venue Name.."
            required
          />
        </label>
        <label htmlFor="venueInfo">
          <input
            type="text"
            id="venueInfo"
            value={venueInfo}
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
            placeholder="Paste Url for venue images here"
          />
        </label>
        <label htmlFor="venuePrice">
          <input
            type="number"
            name="venuePrice"
            id="venuePrice"
            value={venuePrice}
            required
          />
          Price per night in NOK
        </label>
        <label htmlFor="maxGuests">
          <input
            type="number"
            name="maxGuests"
            id="maxGuests"
            value={maxGuests}
            required
          />
          Number of Guests?
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
        </label>
        <label htmlFor="venueMetaBreakfast">
          <input
            type="checkbox"
            name="venueMetaBreakfast"
            id="venueMetaBreakfast"
            checked={venueMeta.breakfast}
            onChange={() => handleMetaChange("breakfast")}
          />
        </label>
        <label htmlFor="venueMetaPets">
          <input
            type="checkbox"
            name="venueMetaPets"
            id="venueMetaPets"
            checked={venueName.pets}
            onChange={() => handleMetaChange("pets")}
          />
        </label>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default NewVenue;
