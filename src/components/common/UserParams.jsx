import { useEffect, useState } from "react";
import DisplayUser from "./DisplayUser";
import { API_MANAGER_ENDPOINT, API_PROFILES, API_HEADERS } from "../utils/url";

const user = sessionStorage.getItem("username");
const token = sessionStorage.getItem("accessToken");
const isManager = sessionStorage.getItem("isManager");

const UserParams = () => {
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("loading");
  const [newAvatar, setNewAvatar] = useState("");

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

  const handleAvatarChange = async (e) => {
    e.preventDefault();

    try {
      const updateUserData = { ...userData, avatar: newAvatar };
      setUserData(updateUserData);
      setNewAvatar("");

      const token = sessionStorage.getItem("accessToken");

      const res = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/profiles/${userData.name}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: newAvatar }),
        }
      );

      if (!res.ok) {
        throw Error(`HTTP error! status: ${res.status}`);
      }

      console.log("Avatar update successful!");
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
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
