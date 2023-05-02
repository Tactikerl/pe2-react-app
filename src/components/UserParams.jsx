import { useEffect, useState } from "react";
import DisplayUser from "./DisplayUser";

const user = sessionStorage.getItem("username");
const token = sessionStorage.getItem("accessToken");

const UserParams = () => {
  const [userData, setUserData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function userDataFetch() {
      try {
        if (!token) return null;
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
          console.log("No user logged in");
        }
      } catch (error) {
        console.error(error);
      }
    }
    userDataFetch();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      {!isLoading && (
        <DisplayUser user={userData.name} userBookings={userData.bookings} />
      )}
    </div>
  );
};

async function getUserData() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return await fetch(
    `https://nf-api.onrender.com/api/v1/holidaze/profiles/${user}?_bookings=true&_venues=true`,
    requestOptions
  );
}

export default UserParams;
