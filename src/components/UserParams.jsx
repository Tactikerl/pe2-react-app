import { useEffect, useState } from "react";
import DisplayUser from "./DisplayUser";

const UserParams = () => {
  //   const userId = 17;
  //   const userLogin = "Karl";
  // const userUrl = "https://nf-api.onrender.com/api/v1/holidaze/profiles/Karl?_bookings=true&_venues=true"
  //   const userToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJLYXJsIiwiZW1haWwiOiJrYXJsdGVzdDAxQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YUlXSXBQWThqVklWOE1WdEhnNDR6T3k5Tkw3bEQtX1BuMWY4MFY9czI4OCIsInZlbnVlTWFuYWdlciI6dHJ1ZSwiaWF0IjoxNjgxMjk0NzA2fQ.zh86yzNd2jiblpXH3tMLM2fnkDVOkmT7dJRSSUy2Bh4";
  const [userData, setUserData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    async function userDataFetch() {
      try {
        setHasError(false);
        setIsLoading(true);
        const res = await getUserData();
        const contentType = res.headers.get(`Content-Type`);
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          setUserData(json);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setHasError(true);
          console.log("No user logged inn");
        }
      } catch (error) {
        console.error(error);
      }
    }
    userDataFetch();
  }, []);

  return (
    <div>
      {!isLoading && (
        <DisplayUser user={userData.name} userBookings={userData.bookings} />
      )}
    </div>
  );
};
/**
 *
 * Make function below smaller, refactor to use localStorage instead of hardcoded params
 * make fetch utilize locaStorage data for userName in url == ${userName}
 */
async function getUserData() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiJLYXJsIiwiZW1haWwiOiJrYXJsdGVzdDAxQHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YUlXSXBQWThqVklWOE1WdEhnNDR6T3k5Tkw3bEQtX1BuMWY4MFY9czI4OCIsInZlbnVlTWFuYWdlciI6dHJ1ZSwiaWF0IjoxNjgxMjk0NzA2fQ.zh86yzNd2jiblpXH3tMLM2fnkDVOkmT7dJRSSUy2Bh4"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    "https://nf-api.onrender.com/api/v1/holidaze/profiles/Karl?_bookings=true&_venues=true",
    requestOptions
  );
}

export default UserParams;
