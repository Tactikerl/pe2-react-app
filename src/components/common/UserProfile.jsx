import { useState, useEffect } from "react";
import DisplayUser from "./DisplayUser";
import {
  API_MANAGER_ENDPOINT,
  API_CUSTOMER_ENDPOINT,
  API_PROFILES,
  API_HEADERS,
} from "../utils/url";

const user = sessionStorage.getItem("username");
const token = sessionStorage.getItem("accessToken");
const isManager = sessionStorage.getItem("isManager");

const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!token) {
          setStatus("error");
          return;
        }

        let endpoint =
          isManager === "true" ? API_MANAGER_ENDPOINT : API_CUSTOMER_ENDPOINT;

        const res = await fetch(`${API_PROFILES}${user}${endpoint}`, {
          method: "GET",
          headers: API_HEADERS,
          redirect: "follow",
        });

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
  return (
    <>
      <DisplayUser user={userData.name} />
    </>
  );
};
export default UserProfile;
