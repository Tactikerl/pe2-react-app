import { useRef } from "react";

const VenueFields = ({ venueData, setVenueData, handleVenueImages }) => {
  const imageElement = useRef("");
  return (
    <>
      <div className="col-md-4  p-3">
        <label className="form-label w-100">
          Venue Name:
          <input
            type="text"
            value={venueData.name}
            id="venueName"
            onChange={(e) =>
              setVenueData({ ...venueData, name: e.target.value })
            }
            required
            className="form-control"
          />
        </label>
        <label className="form-label w-100">
          Description of the Venue
          <textarea
            type="textarea"
            value={venueData.description}
            id="venueInfo"
            onChange={(e) =>
              setVenueData({ ...venueData, description: e.target.value })
            }
            className="form-control"
            required
          />
        </label>
        <label className="form-label w-100">
          Address
          <input
            type="text"
            value={venueData.location.address}
            name="address"
            onChange={(e) =>
              setVenueData({
                ...venueData,
                location: { ...venueData.location, address: e.target.value },
              })
            }
            className="form-control"
          />
        </label>
        <label className="form-label w-100">
          City
          <input
            type="text"
            value={venueData.location.city}
            name="city"
            onChange={(e) =>
              setVenueData({
                ...venueData,
                location: { ...venueData.location, city: e.target.value },
              })
            }
            className="form-control"
          />
        </label>
        <label className="form-label w-100">
          ZIP
          <input
            type="text"
            value={venueData.location.zip}
            name="zip"
            onChange={(e) =>
              setVenueData({
                ...venueData,
                location: { ...venueData.location, zip: e.target.value },
              })
            }
            className="form-control"
          />
        </label>
        <label className="form-label w-100">
          Country
          <input
            type="text"
            value={venueData.location.country}
            name="country"
            onChange={(e) =>
              setVenueData({
                ...venueData,
                location: { ...venueData.location, country: e.target.value },
              })
            }
            className="form-control"
          />
        </label>
        <label className="form-label w-100">
          Latitude
          <input
            type="number"
            value={venueData.location.lat}
            name="lat"
            onChange={(e) =>
              setVenueData({
                ...venueData,
                location: {
                  ...venueData.location,
                  lat: parseInt(e.target.value),
                },
              })
            }
            className="form-control"
          />
        </label>
        <label className="form-label w-100">
          Longitude
          <input
            type="number"
            value={venueData.location.lng}
            name="lng"
            onChange={(e) =>
              setVenueData({
                ...venueData,
                location: {
                  ...venueData.location,
                  lng: parseInt(e.target.value),
                },
              })
            }
            className="form-control"
          />
        </label>

        <label className="form-label w-100">
          Price per night in NOK
          <input
            type="number"
            value={venueData.price}
            className="form-control"
            onChange={(e) =>
              setVenueData({ ...venueData, price: parseInt(e.target.value) })
            }
            required
          />
        </label>
        <label className="form-label w-100">
          Number of Guests?
          <input
            type="number"
            value={venueData.maxGuests}
            onChange={(e) =>
              setVenueData({
                ...venueData,
                maxGuests: parseInt(e.target.value),
              })
            }
            className="form-control"
            required
          />
        </label>
      </div>
      <div className="col-md-8 p-3">
        <div className="bg-white rounded bg-opacity-50 p-3">
          <div className="d-flex flex-wrap gap-2 mb-2">
            {venueData.media.map((imageElement, index) => (
              <img
                className="object-fit-cover"
                key={index}
                src={imageElement}
                height={75}
                width={75}
              />
            ))}
          </div>
          <label className="form-label w-100 mb-0">
            Add image url
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
        <div className="bg-white bg-opacity-50 p-2 rounded mt-3 d-table">
          <div className="form-check">
            <label className="form-check-label">
              Wifi?
              <input
                type="checkbox"
                checked={venueData.meta.wifi}
                onChange={() =>
                  setVenueData({
                    ...venueData,
                    meta: {
                      ...venueData.meta,
                      wifi: !venueData.meta.wifi,
                    },
                  })
                }
                className="form-check-input"
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Parking?
              <input
                type="checkbox"
                className="form-check-input"
                checked={venueData.meta.parking}
                onChange={(e) =>
                  setVenueData({
                    ...venueData,
                    meta: {
                      ...venueData.meta,
                      parking: !venueData.meta.parking,
                    },
                  })
                }
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Breakfast?
              <input
                type="checkbox"
                checked={venueData.meta.breakfast}
                onChange={(e) =>
                  setVenueData({
                    ...venueData,
                    meta: {
                      ...venueData.meta,
                      breakfast: !venueData.meta.breakfast,
                    },
                  })
                }
                className="form-check-input"
              />
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              Pets?
              <input
                type="checkbox"
                checked={venueData.meta.pets}
                onChange={(e) =>
                  setVenueData({
                    ...venueData,
                    meta: { ...venueData.meta, pets: !venueData.meta.pets },
                  })
                }
                className="form-check-input"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueFields;
