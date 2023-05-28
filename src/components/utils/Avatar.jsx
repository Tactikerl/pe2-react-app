import { useState } from "react";
import { handlingServerError } from "./API";

const Avatar = ({ avatar, name, updateCallback }) => {
  const [newAvatar, setNewAvatar] = useState("");

  const handleAvatarChange = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("accessToken");

      const res = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/profiles/${name}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: newAvatar }),
        }
      );

      await handlingServerError(res);
      const json = await res.json();
      setNewAvatar(json.avatar);
      updateCallback(newAvatar);

      console.log("Avatar update successful!");
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div>
      <img
        src={avatar}
        alt={`Profile avatar for ${name}`}
        className="rounded bg-white p-3"
        width={250}
      />

      {/* Avatar change form */}
      <form onSubmit={handleAvatarChange} className="mb-2 mt-2">
        <div className="input-group">
          <input
            type="url"
            value={newAvatar}
            className="form-control"
            onChange={(e) => setNewAvatar(e.target.value)}
            placeholder="New Avatar URL"
            required
          />
          <button className="btn bg-main border-dark" type="submit">
            Change Avatar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Avatar;
