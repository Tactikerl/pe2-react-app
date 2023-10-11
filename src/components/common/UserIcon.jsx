import { useEffect, useState, useContext } from "react";
import userIcon from "../../assets/icons/user.svg";
import { API_PROFILES } from "../utils/url";
import { UserContext } from "../utils/UserContext";

const UserIcon = () => {
  const [avatar, setAvatar] = useState(userIcon);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getAvatar(username, token) {
      const res = await fetch(`${API_PROFILES}${username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      });

      const contentType = res.headers.get(`Content-Type`);
      if (contentType && contentType.includes("application/json")) {
        const json = await res.json();
        setAvatar(json.avatar);
      }
    }

    if (user.accessToken) {
      const username = user.username;
      getAvatar(username, user.accessToken);
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
