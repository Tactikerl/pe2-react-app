import { useEffect, useState } from "react";
import DisplayUser from "./DisplayUser";
import { API_MANAGER_ENDPOINT, API_PROFILES, API_HEADERS } from "../utils/url";

const user = sessionStorage.getItem("username");
const token = sessionStorage.getItem("accessToken");
const isManager = sessionStorage.getItem("isManager");

const UserParams = ({ title }) => {
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("loading");
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!token) {
          setStatus("error");
          return;
        }

        const res = await fetch(
          `${API_PROFILES}${user}${API_MANAGER_ENDPOINT}`,
          {
            method: "GET",
            headers: API_HEADERS,
            redirect: "follow",
          }
        );

        const contentType = res.headers.get(`Content-Type`);
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          setUserData(json);
          setStatus("success");
        } else {
          setStatus("error");

          console.log("No user logged in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setStatus("error");
      }
    }
    fetchUserData();
  }, []);

  const handleAvatarChange = (newAvatar) => {
    const updateUserData = { ...userData, avatar: newAvatar };
    setUserData(updateUserData);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container h-100">
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && (
        <DisplayUser
          user={userData}
          userBookings={userData.bookings}
          showVenuesLink={isManager === "true"}
          userVenues={isManager === "true" ? userData.venues : null}
          handleAvatarChange={handleAvatarChange}
          newAvatar={newAvatar}
          setNewAvatar={setNewAvatar}
        />
      )}
    </div>
  );
};

export default UserParams;
