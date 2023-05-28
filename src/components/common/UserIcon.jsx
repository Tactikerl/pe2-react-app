import { useEffect, useState } from "react";
import user from "../../assets/icons/user.svg";
import { API_HEADERS, API_PROFILES } from "../utils/url";

const UserIcon = () => {
  const [avatar, setAvatar] = useState(user);
  useEffect(() => {
    async function getAvatar(user) {
      const res = await fetch(`${API_PROFILES}${user}`, {
        method: "GET",
        headers: API_HEADERS,
        redirect: "follow",
      });

      const contentType = res.headers.get(`Content-Type`);
      if (contentType && contentType.includes("application/json")) {
        const json = await res.json();
        setAvatar(json.avatar);
      }
    }
    if (sessionStorage.getItem("accessToken")) {
      const user = sessionStorage.getItem("username");
      getAvatar(user);
    }
  }, []);

  return (
    <img
      className="bg-light rounded-circle mt-2"
      src={avatar}
      alt=""
      height={25}
      width={25}
    />
  );
};

export default UserIcon;
