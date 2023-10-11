export const API_USER_ENDPOINT = `https://nf-api.onrender.com/api/v1/holidaze/profiles/`;

export const API_MANAGER_ENDPOINT = `?_bookings=true&_venues=true`;

export const API_CUSTOMER_ENDPOINT = `?_bookings=true`;

export const API_REGISTER = `https://nf-api.onrender.com/api/v1/holidaze/auth/register`;

export const API_LOGIN = `https://nf-api.onrender.com/api/v1/holidaze/auth/login`;

export const API_PROFILES = `https://nf-api.onrender.com/api/v1/holidaze/profiles/`;

export const API_VENUES = `https://nf-api.onrender.com/api/v1/holidaze/venues?_owner=true&_bookings=true`;

export const API_VENUES_PGN = `https://nf-api.onrender.com/api/v1/holidaze/venues?limit=10&sort=rating&sortOrder=desc&_owner=true&offset=`; //sort=rating&sortOrder=desc&

export const API_VENUES_SRT = (limit, offset, sort, sortOrder) =>
  `https://nf-api.onrender.com/api/v1/holidaze/venues?limit=${limit}&offset=${offset}&sort=${sort}&sortOrder=${sortOrder}&_owner=true`;

export const API_CREATE = `https://nf-api.onrender.com/api/v1/holidaze/venues`;

export const API_FETCH_VENUE = `https://nf-api.onrender.com/api/v1/holidaze/venues/`;

export const API_VENUE_PARAMS = `?_owner=true&_bookings=true`;

export const API_EDIT_VENUE = `https://nf-api.onrender.com/api/v1/holidaze/venues/`;

export const API_DELETE_VENUE = `https://nf-api.onrender.com/api/v1/holidaze/venues/`;

export const API_ALL_BOOKINGS = `https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true`;

export const API_CREATE_BOOKING = `https://nf-api.onrender.com/api/v1/holidaze/bookings?_customer=true&_venue=true`;

export const API_BOOKING_ID = `https://nf-api.onrender.com/api/v1/holidaze/bookings/?_customer=true&_venue=true`;

export const API_DELETE_BOOKING = `https://nf-api.onrender.com/api/v1/holidaze/bookings/`;

export const API_BOOKINGS_TRUE = "/venues?_owner=true&_bookings=true";
