import { useState } from "react";

const AvatarChange = () => {
  const [newAvatar, setNewAvatar] = useState("");
  const [userData, setUserData] = useState({});
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

  return (
    <div>
      <h1>{userData.name}</h1>
      <img src={userData.avatar} alt={`Profile avatar for ${userData.name}`} />

      {/* Avatar change form */}
      <form onSubmit={handleAvatarChange}>
        <input
          type="text"
          value={newAvatar}
          onChange={(e) => setNewAvatar(e.target.value)}
          placeholder="New Avatar URL"
          required
        />
        <button type="submit">Change Avatar</button>
      </form>
    </div>
  );
};

export default AvatarChange;
