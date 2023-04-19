import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewVenue from "./ViewVenue";
import Calendar from "@demark-pro/react-booking-calendar";

const reserved = [
  {
    startDate: new Date(2023, 3, 22),
    endDate: new Date(2016, 4, 5),
  },
];

const FetchedVenue = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const handleChange = (e) => setSelectedDates(e);
  const { id } = useParams();
  const [fetchedVenue, setFetchedVenue] = useState({});

  useEffect(() => {
    requestFetchedVenue(id);
  }, [id]);

  async function requestFetchedVenue(id) {
    const res = await fetch(
      `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );
    const json = await res.json();
    setFetchedVenue(json);
  }

  // const reserved = [
  //   {
  //     startDate: fetchedVenue.bookings[0].dateFrom,
  //     endDate: fetchedVenue.bookings[0].dateTo,
  //   },
  // ];

  return (
    <div>
      <ViewVenue
        name={fetchedVenue.name}
        images={fetchedVenue.media}
        owner={fetchedVenue.owner}
        created={fetchedVenue.created}
        updated={fetchedVenue.updated}
        meta={fetchedVenue.meta}
        maxGuests={fetchedVenue.maxGuests}
        price={fetchedVenue.price}
      />
      {/* <Calendar
        selected={selectedDates}
        onChange={handleChange}
        onOverbook={(e, err) => alert(err)}
        components={{
          DayCellFooter: ({ innerProps }) => (
            <div {...innerProps}>My custom day footer</div>
          ),
        }}
        disabled={(date, state) => !state.isSameMonth}
        reserved={reserved}
        variant="events"
        dateFnsOptions={{ weekStartsOn: 1 }}
        range={true}
      /> */}

      {fetchedVenue.bookings && (
        <Calendar
          classNamePrefix="calendar"
          selected={selectedDates}
          onChange={handleChange}
          onOverbook={(e, err) => alert(err)}
          disabled={(date, state) => !state.isSameMonth}
          reserved={[
            {
              startDate: new Date(fetchedVenue.bookings[0].dateFrom),
              endDate: new Date(fetchedVenue.bookings[0].dateTo),
            },
          ]}
          variant="events"
          dateFnsOptions={{ weekStartsOn: 1 }}
          range={true}
        />
      )}
    </div>
  );
};

export default FetchedVenue;
