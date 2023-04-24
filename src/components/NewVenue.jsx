import { useState } from "react";

const NewVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [venueInfo, setVenueInfo] = useState("");
  const [venueImages, setVenueImages] = useState([]);
  const [venuePrice, setVenuePrice] = useState();
  const [maxGuests, setMaxGuests] = useState();
  const [venueMeta, setVenueMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
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
        </label>
        <label htmlFor="maxGuests">
          <input
            type="number"
            name="maxGuests"
            id="maxGuests"
            value={maxGuests}
            required
          />
        </label>
        <label htmlFor="venueMetaWifi">
          <input type="checkbox" name="" />
        </label>
      </form>
    </div>
  );
};
