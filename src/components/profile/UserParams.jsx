import { useEffect, useState, useContext } from "react";
import DisplayUser from "./DisplayUser";
import { API_MANAGER_ENDPOINT, API_PROFILES } from "../utils/url";
import { UserContext } from "../utils/UserContext";

const UserParams = ({ title }) => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState("loading");
  const [newAvatar, setNewAvatar] = useState("");

  const userName = user.username;
  const token = user.accessToken;
  const isManager = user.isManager;

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
          `${API_PROFILES}${userName}${API_MANAGER_ENDPOINT}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  if (!userName) {
    return null;
  }

  return (
    <div className="container">
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && (
        <DisplayUser
          userData={userData}
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
