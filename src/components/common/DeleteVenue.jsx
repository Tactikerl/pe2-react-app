import { useState, useEffect } from "react";

const DeleteVenue = ({ id, venueOwner }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    setUserName(user);
  }, []);

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete the venue.");
      }

      setIsDeleted(true);
      console.log("Venue deleted successfully");
    } catch (error) {
      setError("An error occurred while deleting the venue.");
      console.error("Error deleting venue:", error);
    }
  };

  if (isDeleted) {
    return <p>Venue deleted successfully.</p>;
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <p>Are you sure you want to delete this venue?</p>

      <button onClick={handleDelete}>Delete Venue</button>
    </div>
  );
};

export default DeleteVenue;